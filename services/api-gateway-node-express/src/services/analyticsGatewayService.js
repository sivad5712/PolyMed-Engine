const path = require('path');
const fs = require('fs');

const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'http://localhost:8083';

// Load static payloads
let fallbackPayloads = {};
try {
  const filePath = path.join(__dirname, '../../../../shared/payloads/analytics-payloads.json');
  fallbackPayloads = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (err) {
  console.warn('[GATEWAY-WARN] Failed to load local analytics fallback payloads.', err.message);
}

async function forwardGetSummary(correlationId) {
  try {
    const res = await fetch(`${ANALYTICS_SERVICE_URL}/analytics/dashboard-summary`, {
      method: 'GET',
      headers: { 'X-Correlation-ID': correlationId }
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Analytics service offline. Returning simulated response.`);
  }

  return {
    success: true,
    message: "Dashboard summary analytics retrieved (Simulated Fallback)",
    data: fallbackPayloads.dashboardSummary || {},
    correlationId
  };
}

async function forwardGetCareGapsAnalytics(correlationId) {
  try {
    const res = await fetch(`${ANALYTICS_SERVICE_URL}/analytics/care-gap-summary`, {
      method: 'GET',
      headers: { 'X-Correlation-ID': correlationId }
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Analytics service offline. Returning simulated response.`);
  }

  return {
    success: true,
    message: "Care gaps compliance analytics retrieved (Simulated Fallback)",
    data: fallbackPayloads.careGapSummary || {},
    correlationId
  };
}

async function forwardGetClaimsAnalytics(correlationId) {
  try {
    const res = await fetch(`${ANALYTICS_SERVICE_URL}/analytics/claims-summary`, {
      method: 'GET',
      headers: { 'X-Correlation-ID': correlationId }
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Analytics service offline. Returning simulated response.`);
  }

  return {
    success: true,
    message: "Claims analytics retrieved (Simulated Fallback)",
    data: fallbackPayloads.claimsSummary || {},
    correlationId
  };
}

module.exports = {
  forwardGetSummary,
  forwardGetCareGapsAnalytics,
  forwardGetClaimsAnalytics
};
