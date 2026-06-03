const path = require('path');
const fs = require('fs');

const RISK_SERVICE_URL = process.env.RISK_SERVICE_URL || 'http://localhost:8085';

// Load static payloads
let fallbackPayloads = {};
try {
  const filePath = path.join(__dirname, '../../../../shared/payloads/risk-scoring-payloads.json');
  fallbackPayloads = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (err) {
  console.warn('[GATEWAY-WARN] Failed to load local risk fallback payloads.', err.message);
}

async function forwardCalculateRisk(body, correlationId) {
  // Try downstream scoring API if running
  try {
    const res = await fetch(`${RISK_SERVICE_URL}/risk/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': correlationId
      },
      body: JSON.stringify(body)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`[GATEWAY-WARN] Downstream Scala Risk Scoring service offline. Performing in-gateway rule calculation.`);
  }

  // Calculate using exact clinical rules
  let calculatedScore = 0;
  const ruleResults = [];

  // 1. Chronic condition count rule
  if (body.chronicConditionsCount >= 3) {
    calculatedScore += 20;
    ruleResults.push({
      ruleName: "CHRONIC_CONDITION_COUNT_RULE",
      pointsAdded: 20.0,
      message: `Patient has ${body.chronicConditionsCount} chronic conditions (threshold: 3+ add 20 points)`
    });
  }

  // 2. Recent hospitalization rule
  if (body.recentHospitalizations > 0) {
    const pts = Math.min(body.recentHospitalizations * 15, 30);
    calculatedScore += pts;
    ruleResults.push({
      ruleName: "RECENT_HOSPITALIZATION_RULE",
      pointsAdded: parseFloat(pts.toFixed(1)),
      message: `Patient has ${body.recentHospitalizations} hospitalizations within the last 12 months (threshold: 1+ add 15 points per hospitalization, max 30)`
    });
  }

  // 3. Medication adherence risk rule
  if (body.medicationAdherenceRate < 0.8) {
    calculatedScore += 15;
    ruleResults.push({
      ruleName: "MEDICATION_ADHERENCE_RULE",
      pointsAdded: 15.0,
      message: `Medication adherence is ${(body.medicationAdherenceRate * 100).toFixed(0)}% which is below the 80% compliance threshold (add 15 points)`
    });
  }

  // 4. High claims utilization rule
  if (body.claimsUtilizationCount >= 20) {
    calculatedScore += 10;
    ruleResults.push({
      ruleName: "CLAIMS_UTILIZATION_RULE",
      pointsAdded: 10.0,
      message: `High claims utilization of ${body.claimsUtilizationCount} (threshold: 20+ add 10 points)`
    });
  }

  // 5. Open care gap rule
  if (body.openCareGapsCount > 0) {
    calculatedScore += 5;
    ruleResults.push({
      ruleName: "OPEN_CARE_GAP_RULE",
      pointsAdded: 5.0,
      message: `Patient has ${body.openCareGapsCount} open care gaps (add 5 points for any open care gaps)`
    });
  }

  // 6. Abnormal observation rule
  let obsPoints = 0;
  let obsMsg = [];
  if (body.systolicBP > 140 || body.diastolicBP > 90) {
    obsPoints += 5;
    obsMsg.push(`Elevated blood pressure (${body.systolicBP}/${body.diastolicBP})`);
  }
  if (body.fastingBloodSugar > 126) {
    obsPoints += 5.5;
    obsMsg.push(`fasting blood sugar (${body.fastingBloodSugar} mg/dL)`);
  }
  if (obsPoints > 0) {
    calculatedScore += obsPoints;
    ruleResults.push({
      ruleName: "ABNORMAL_OBSERVATION_RULE",
      pointsAdded: obsPoints,
      message: `Abnormal readings detected: ${obsMsg.join(' and ')}`
    });
  }

  // Determine Category
  let riskCategory = "LOW_RISK";
  if (calculatedScore > 70) {
    riskCategory = "HIGH_RISK";
  } else if (calculatedScore > 30) {
    riskCategory = "MEDIUM_RISK";
  }

  // Generate Explanation
  let explanation = `Patient risk evaluated at ${calculatedScore}. Primary drivers: ${ruleResults.map(r => r.ruleName).join(', ') || 'None'}.`;
  if (riskCategory === "HIGH_RISK") {
    explanation = "Critical clinical status: Multiple chronic conditions, hospitalizations, or poor adherence require immediate Care Management intervention.";
  }

  return {
    success: true,
    message: "Clinical risk scoring completed (Gateway Simulated Fallback)",
    data: {
      patientId: body.patientId,
      calculatedScore: parseFloat(calculatedScore.toFixed(1)),
      riskCategory,
      evaluationTimestamp: new Date().toISOString(),
      ruleResults,
      explanation
    },
    correlationId
  };
}

module.exports = {
  forwardCalculateRisk
};
