<?php

use App\Services\TechnologyTraceService;

// Router logic for PHP CLI server simulation
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Load correlation ID
$correlationId = $_SERVER['HTTP_X_CORRELATION_ID'] ?? 'corr-unknown';

// JSON Response Headers
header('Content-Type: application/json');
header('X-Correlation-ID: ' . $correlationId);

// Database seed simulation path
$dbPath = __DIR__ . '/db.json';
if (!file_exists($dbPath)) {
    $initialDb = [
        'notifications' => [
            [
                'notificationId' => 'notif-00981',
                'patientId' => 'pat-88291',
                'type' => 'EMAIL',
                'templateCode' => 'CARE_GAP_OPEN',
                'recipient' => 'john.doe@example.com',
                'subject' => 'Action Required: Outstanding Preventive Health Check',
                'body' => 'Dear John, our records show that your Annual HbA1c Diabetes Testing (A1C-TEST) is outstanding. Please contact Dr. Sarah Jenkins to schedule an appointment.',
                'status' => 'SENT',
                'sentAt' => '2026-06-02T15:30:00Z'
            ]
        ],
        'templates' => [
            [
                'templateCode' => 'CARE_GAP_OPEN',
                'subject' => 'Outstanding Care Gap Reminder',
                'bodyTemplate' => 'Dear {name}, you have an open care gap: {measure}. Please schedule a visit.'
            ]
        ],
        'preferences' => [
            'pat-88291' => [
                'patientId' => 'pat-88291',
                'receiveEmail' => true,
                'receiveSMS' => true,
                'preferredChannels' => ['EMAIL', 'SMS']
            ]
        ],
        'audits' => [
            [
                'notificationId' => 'notif-00981',
                'status' => 'SENT',
                'timestamp' => '2026-06-02T15:30:00Z'
            ]
        ]
    ];
    file_put_contents($dbPath, json_encode($initialDb, JSON_PRETTY_PRINT));
}

$db = json_decode(file_get_contents($dbPath), true);

function saveDb($data, $path) {
    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
}

function build_success($message, $data, $corrId, $trace) {
    echo json_encode([
        "success" => true,
        "message" => $message,
        "data" => $data,
        "technologyTrace" => $trace,
        "correlationId" => $corrId
    ]);
    exit;
}

function build_error($errorCode, $message, $status, $corrId, $trace) {
    http_response_code($status);
    echo json_encode([
        "success" => false,
        "errorCode" => $errorCode,
        "message" => $message,
        "details" => [],
        "technologyTrace" => $trace,
        "correlationId" => $corrId
    ]);
    exit;
}

// 1. GET /health
if ($uri === '/health' && $method === 'GET') {
    echo json_encode(["status" => "UP", "service" => "Notification Service (Laravel API)"]);
    exit;
}

// 2. GET /technology-trace
if ($uri === '/technology-trace' && $method === 'GET') {
    $trace = TechnologyTraceService::getTrace("DISPATCH_NOTIFICATION", "/api/technology-trace");
    build_success("Technology trace retrieved successfully", ["trace" => $trace], $correlationId, $trace);
}

// 3. POST /notifications
if ($uri === '/notifications' && $method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    $trace = TechnologyTraceService::getTrace("DISPATCH_NOTIFICATION", "/api/notifications");
    
    if (!isset($body['patientId']) || !isset($body['type']) || !isset($body['templateCode'])) {
        build_error("VALIDATION_ERROR", "patientId, type, and templateCode are required", 400, $correlationId, $trace);
    }
    
    $notifId = 'notif-' . rand(10000, 99999);
    $newNotif = [
        'notificationId' => $notifId,
        'patientId' => $body['patientId'],
        'type' => $body['type'],
        'templateCode' => $body['templateCode'],
        'recipient' => $body['recipient'] ?? 'patient@polymed.com',
        'subject' => 'Healthcare Notification - ' . $body['templateCode'],
        'body' => $body['body'] ?? 'This is a custom template message content.',
        'status' => 'SENT',
        'sentAt' => date('Y-m-d\TH:i:s\Z')
    ];
    
    $db['notifications'][] = $newNotif;
    $db['audits'][] = [
        'notificationId' => $notifId,
        'status' => 'SENT',
        'timestamp' => date('Y-m-d\TH:i:s\Z')
    ];
    saveDb($db, $dbPath);
    
    build_success("Notification dispatched successfully", $newNotif, $correlationId, $trace);
}

// 4. GET /notifications
if ($uri === '/notifications' && $method === 'GET') {
    $trace = TechnologyTraceService::getTrace("DISPATCH_NOTIFICATION", "/api/notifications");
    build_success("Notifications list retrieved", ["notifications" => $db['notifications']], $correlationId, $trace);
}

// 5. GET /notifications/{id}
if (preg_match('/^\/notifications\/([a-zA-Z0-9\-]+)$/', $uri, $matches) && $method === 'GET') {
    $id = $matches[1];
    $trace = TechnologyTraceService::getTrace("DISPATCH_NOTIFICATION", "/api/notifications/" . $id);
    foreach ($db['notifications'] as $n) {
        if ($n['notificationId'] === $id) {
            build_success("Notification details retrieved", $n, $correlationId, $trace);
        }
    }
    build_error("RESOURCE_NOT_FOUND", "Notification not found", 404, $correlationId, $trace);
}

// 6. POST /notification-templates
if ($uri === '/notification-templates' && $method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    $trace = TechnologyTraceService::getTrace("DISPATCH_NOTIFICATION", "/api/notification-templates");
    
    if (!isset($body['templateCode']) || !isset($body['subject']) || !isset($body['bodyTemplate'])) {
        build_error("VALIDATION_ERROR", "templateCode, subject, and bodyTemplate are required", 400, $correlationId, $trace);
    }
    
    $newTemplate = [
        'templateCode' => $body['templateCode'],
        'subject' => $body['subject'],
        'bodyTemplate' => $body['bodyTemplate']
    ];
    
    $db['templates'][] = $newTemplate;
    saveDb($db, $dbPath);
    build_success("Notification template created successfully", $newTemplate, $correlationId, $trace);
}

// 7. GET /notification-templates
if ($uri === '/notification-templates' && $method === 'GET') {
    $trace = TechnologyTraceService::getTrace("DISPATCH_NOTIFICATION", "/api/notification-templates");
    build_success("Notification templates retrieved", ["templates" => $db['templates']], $correlationId, $trace);
}

// 8. GET /notification-preferences/{patientId}
if (preg_match('/^\/notification-preferences\/([a-zA-Z0-9\-]+)$/', $uri, $matches) && $method === 'GET') {
    $patientId = $matches[1];
    $trace = TechnologyTraceService::getTrace("DISPATCH_NOTIFICATION", "/api/notification-preferences/" . $patientId);
    $pref = $db['preferences'][$patientId] ?? [
        'patientId' => $patientId,
        'receiveEmail' => true,
        'receiveSMS' => true,
        'preferredChannels' => ['EMAIL']
    ];
    build_success("Notification preferences retrieved", $pref, $correlationId, $trace);
}

// 9. POST /notification-preferences/{patientId}
if (preg_match('/^\/notification-preferences\/([a-zA-Z0-9\-]+)$/', $uri, $matches) && $method === 'POST') {
    $patientId = $matches[1];
    $body = json_decode(file_get_contents('php://input'), true);
    $trace = TechnologyTraceService::getTrace("DISPATCH_NOTIFICATION", "/api/notification-preferences/" . $patientId);
    
    $pref = [
        'patientId' => $patientId,
        'receiveEmail' => $body['receiveEmail'] ?? true,
        'receiveSMS' => $body['receiveSMS'] ?? true,
        'preferredChannels' => $body['preferredChannels'] ?? ['EMAIL']
    ];
    
    $db['preferences'][$patientId] = $pref;
    saveDb($db, $dbPath);
    build_success("Notification preferences updated successfully", $pref, $correlationId, $trace);
}

// 10. GET /notification-audits
if ($uri === '/notification-audits' && $method === 'GET') {
    $trace = TechnologyTraceService::getTrace("DISPATCH_NOTIFICATION", "/api/notification-audits");
    build_success("Notification delivery audit records retrieved", ["audits" => $db['audits']], $correlationId, $trace);
}

// 404 fallback
$fallbackTrace = TechnologyTraceService::getTrace("API_REQUEST", $uri);
build_error("ROUTE_NOT_FOUND", "Route not found", 404, $correlationId, $fallbackTrace);
