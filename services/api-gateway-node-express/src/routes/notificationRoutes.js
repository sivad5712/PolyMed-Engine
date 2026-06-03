const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation');
const { forwardCreateNotification } = require('../services/notificationGatewayService');
const { getTraceForAction } = require('../services/technologyTraceService');
const { buildSuccess } = require('../utils/responseBuilder');

// POST /api/notifications
router.post('/', validation('notification'), async (req, res, next) => {
  try {
    const result = await forwardCreateNotification(req.body, req.correlationId);
    const trace = getTraceForAction('DISPATCH_NOTIFICATION', '/api/notifications');
    
    res.status(result.success ? 201 : 400).json({
      success: result.success,
      message: result.message,
      data: result.data,
      technologyTrace: trace,
      correlationId: req.correlationId
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/notifications/templates
router.get('/templates', (req, res) => {
  const trace = getTraceForAction('DISPATCH_NOTIFICATION', '/api/notifications/templates');
  buildSuccess(res, 200, "Notification templates retrieved (Simulated Fallback)", {
    templates: [
      { templateCode: "CARE_GAP_OPEN", subject: "Preventive Care Needed", bodyTemplate: "Dear {name}, your annual testing is overdue." }
    ]
  }, req.correlationId, trace);
});

// GET /api/notifications/preferences/:patientId
router.get('/preferences/:patientId', (req, res) => {
  const trace = getTraceForAction('DISPATCH_NOTIFICATION', `/api/notifications/preferences/${req.params.patientId}`);
  buildSuccess(res, 200, "Notification preferences retrieved (Simulated Fallback)", {
    patientId: req.params.patientId,
    receiveEmail: true,
    receiveSMS: true,
    preferredChannels: ["EMAIL", "SMS"]
  }, req.correlationId, trace);
});

// GET /api/notifications/audit
router.get('/audit', (req, res) => {
  const trace = getTraceForAction('DISPATCH_NOTIFICATION', '/api/notifications/audit');
  buildSuccess(res, 200, "Notification audits list retrieved (Simulated Fallback)", {
    audits: [
      { notificationId: "notif-00981", status: "SENT", timestamp: "2026-06-02T15:30:00Z" }
    ]
  }, req.correlationId, trace);
});

module.exports = router;
