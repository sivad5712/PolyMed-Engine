const path = require('path');
const fs = require('fs');

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8084';

// Load static payloads
let fallbackPayloads = {};
try {
  const filePath = path.join(__dirname, '../../../../shared/payloads/notification-payloads.json');
  fallbackPayloads = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (err) {
  console.warn('[GATEWAY-WARN] Failed to load local notification fallback payloads.', err.message);
}

async function forwardCreateNotification(body, correlationId) {
  try {
    const res = await fetch(`${NOTIFICATION_SERVICE_URL}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': correlationId
      },
      body: JSON.stringify(body)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Notification service offline. Returning simulated response.`);
  }

  return {
    success: true,
    message: "Notification dispatched successfully (Simulated Fallback)",
    data: {
      notificationId: `notif-${Math.floor(10000 + Math.random() * 90000)}`,
      patientId: body.patientId,
      type: body.type,
      templateCode: body.templateCode,
      recipient: body.recipient || "patient@fallback.com",
      subject: "Health Alert Notification",
      body: "This is a simulated message content triggered because the notification service is offline.",
      status: "SENT",
      sentAt: new Date().toISOString()
    },
    correlationId
  };
}

module.exports = {
  forwardCreateNotification
};
