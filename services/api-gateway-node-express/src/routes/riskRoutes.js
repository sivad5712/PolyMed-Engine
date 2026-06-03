const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation');
const { forwardCalculateRisk } = require('../services/riskGatewayService');
const { getTraceForAction } = require('../services/technologyTraceService');
const { buildSuccess } = require('../utils/responseBuilder');

// POST /api/risk/score
router.post('/score', validation('risk'), async (req, res, next) => {
  try {
    const result = await forwardCalculateRisk(req.body, req.correlationId);
    const trace = getTraceForAction('EVALUATE_RISK', '/api/risk/score');
    
    res.status(result.success ? 200 : 400).json({
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

// GET /api/risk/rules
router.get('/rules', (req, res) => {
  const trace = getTraceForAction('EVALUATE_RISK', '/api/risk/rules');
  buildSuccess(res, 200, "Clinical risk rules definition catalog retrieved", {
    rules: [
      { name: "ChronicConditionRule", points: 20.0, description: "Triggered if chronic condition count is 3 or more." },
      { name: "RecentHospitalizationRule", points: "15.0 per admission (cap 30)", description: "Triggered for hospitalizations in last 12 months." },
      { name: "MedicationAdherenceRule", points: 15.0, description: "Triggered if med adherence is below 80%." },
      { name: "ClaimsUtilizationRule", points: 10.0, description: "Triggered if claim count is 20 or more." },
      { name: "CareGapRule", points: 5.0, description: "Triggered if there are open care gaps." },
      { name: "ObservationRule", points: "5.0 (BP) + 5.5 (Sugar)", description: "Triggered for BP > 140/90 or Fasting Sugar > 126 mg/dL." },
      { name: "AgeRiskRule", points: 10.0, description: "Triggered for patients over 65 years old." },
      { name: "EmergencyVisitRule", points: 12.0, description: "Triggered for emergency room visits in last 12 months." }
    ]
  }, req.correlationId, trace);
});

module.exports = router;
