<?php

namespace App\Services;

class TechnologyTraceService
{
    public static function getTrace($action, $requestPath)
    {
        return [
            "action" => $action,
            "service" => "Notification Service",
            "module" => "notification-service-laravel",
            "technologyStack" => ["PHP", "Laravel"],
            "businessDomain" => "Patient and Care Team Notifications",
            "whyThisStack" => "Laravel is selected due to its expressive syntax, template engines, and notification queues for patient/provider messaging.",
            "requestPath" => $requestPath,
            "architectureRole" => "Handles template rendering and communication preferences audits."
        ];
    }
}
