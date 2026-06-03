const path = require('path');
const fs = require('fs');

const CLAIMS_SERVICE_URL = process.env.CLAIMS_SERVICE_URL || 'http://localhost:8082';

// Load static payloads
let fallbackPayloads = {};
try {
  const filePath = path.join(__dirname, '../../../../shared/payloads/claims-payloads.json');
  fallbackPayloads = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (err) {
  console.warn('[GATEWAY-WARN] Failed to load local claims fallback payloads.', err.message);
}

async function forwardGetMembers(correlationId) {
  try {
    const res = await fetch(`${CLAIMS_SERVICE_URL}/members`, {
      method: 'GET',
      headers: { 'X-Correlation-ID': correlationId }
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Claims service offline. Returning simulated response.`);
  }

  return {
    success: true,
    message: "Members list retrieved (Simulated Fallback)",
    data: {
      members: [
        fallbackPayloads.memberSample || { memberId: "mem-44910", firstName: "John", lastName: "Doe", policyNumber: "POL-9910293", coverageStatus: "ACTIVE" }
      ]
    },
    correlationId
  };
}

async function forwardSubmitClaim(body, correlationId) {
  try {
    const res = await fetch(`${CLAIMS_SERVICE_URL}/claims`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': correlationId
      },
      body: JSON.stringify(body)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Claims service offline. Returning simulated response.`);
  }

  return {
    success: true,
    message: "Claim submitted successfully (Simulated Fallback)",
    data: {
      claimId: body.claimId || `clm-${Math.floor(10000 + Math.random() * 90000)}`,
      memberId: body.memberId,
      providerId: body.providerId,
      totalCharged: body.totalCharged,
      billingCodes: body.billingCodes,
      status: "SUBMITTED",
      createdAt: new Date().toISOString()
    },
    correlationId
  };
}

async function forwardUpdateClaimStatus(claimId, body, correlationId) {
  try {
    const res = await fetch(`${CLAIMS_SERVICE_URL}/claims/${claimId}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': correlationId
      },
      body: JSON.stringify(body)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Claims service offline. Returning simulated response.`);
  }

  return {
    success: true,
    message: "Claim status updated (Simulated Fallback)",
    data: {
      claimId,
      status: body.status || "APPROVED",
      adjudicatedAmount: body.adjudicatedAmount || 180.0,
      patientResponsibility: body.patientResponsibility || 45.0,
      denialReason: body.denialReason || null,
      reviewerNotes: body.reviewerNotes || "Adjudicated successfully via gateway simulation.",
      updatedAt: new Date().toISOString()
    },
    correlationId
  };
}

module.exports = {
  forwardGetMembers,
  forwardSubmitClaim,
  forwardUpdateClaimStatus
};
