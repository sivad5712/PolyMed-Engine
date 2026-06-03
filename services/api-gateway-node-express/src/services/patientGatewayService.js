const path = require('path');
const fs = require('fs');

const PATIENT_SERVICE_URL = process.env.PATIENT_SERVICE_URL || 'http://localhost:8081';

// Load static fallback payloads
let fallbackPayloads = {};
try {
  const filePath = path.join(__dirname, '../../../../shared/payloads/patient-payloads.json');
  fallbackPayloads = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (err) {
  console.warn('[GATEWAY-WARN] Failed to load local patient fallback payloads. Using hardcoded defaults.', err.message);
}

const mockProviderList = {
  providers: [
    { providerId: 'prov-11029', name: 'Sarah Jenkins', specialty: 'Cardiology', facility: 'Boston Medical Center' },
    { providerId: 'prov-33410', name: 'David Miller', specialty: 'Family Medicine', facility: 'Cambridge Health' }
  ]
};

async function forwardRegisterPatient(body, correlationId) {
  try {
    const res = await fetch(`${PATIENT_SERVICE_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': correlationId,
        'X-Role-Header': 'ADMIN'
      },
      body: JSON.stringify(body)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Patient Service offline. Returning simulated response. Error: ${err.message}`);
  }

  // Fallback simulation
  return {
    success: true,
    message: "Patient registered successfully (Simulated Fallback)",
    data: {
      patientId: `pat-${Math.floor(10000 + Math.random() * 90000)}`,
      ...body,
      status: "ACTIVE",
      createdAt: new Date().toISOString()
    },
    correlationId
  };
}

async function forwardGetPatient(patientId, correlationId) {
  try {
    const res = await fetch(`${PATIENT_SERVICE_URL}/patients/${patientId}`, {
      method: 'GET',
      headers: {
        'X-Correlation-ID': correlationId,
        'X-Role-Header': 'CLINICIAN'
      }
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Patient Service offline. Returning simulated response. Error: ${err.message}`);
  }

  // Fallback simulation
  const profile = fallbackPayloads.patientProfileResponse || {};
  return {
    success: true,
    message: "Patient profile retrieved (Simulated Fallback)",
    data: {
      ...profile,
      patientId
    },
    correlationId
  };
}

async function forwardGetProviders(correlationId) {
  try {
    const res = await fetch(`${PATIENT_SERVICE_URL}/providers`, {
      method: 'GET',
      headers: {
        'X-Correlation-ID': correlationId,
        'X-Role-Header': 'CLINICIAN'
      }
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Patient Service offline. Returning simulated response. Error: ${err.message}`);
  }

  return {
    success: true,
    message: "Providers list retrieved (Simulated Fallback)",
    data: mockProviderList,
    correlationId
  };
}

async function forwardGetCareGaps(patientId, correlationId) {
  try {
    const res = await fetch(`${PATIENT_SERVICE_URL}/care-gaps/patient/${patientId}`, {
      method: 'GET',
      headers: {
        'X-Correlation-ID': correlationId,
        'X-Role-Header': 'CARE_MANAGER'
      }
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Patient Service offline. Returning simulated response. Error: ${err.message}`);
  }

  // Load from care-gap-payloads
  let careGaps = {};
  try {
    const filePath = path.join(__dirname, '../../../../shared/payloads/care-gap-payloads.json');
    careGaps = JSON.parse(fs.readFileSync(filePath, 'utf8')).careGapSummary || {};
  } catch (e) {
    careGaps = { totalGaps: 1, openGaps: 1, closedGaps: 0 };
  }

  return {
    success: true,
    message: "Care gaps retrieved (Simulated Fallback)",
    data: {
      ...careGaps,
      patientId
    },
    correlationId
  };
}

module.exports = {
  forwardRegisterPatient,
  forwardGetPatient,
  forwardGetProviders,
  forwardGetCareGaps
};
