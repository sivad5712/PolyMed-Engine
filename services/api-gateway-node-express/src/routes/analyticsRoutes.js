const express = require('express');
const router = express.Router();
const { forwardGetSummary, forwardGetCareGapsAnalytics, forwardGetClaimsAnalytics } = require('../services/analyticsGatewayService');
const { getTraceForAction } = require('../services/technologyTraceService');

// GET /api/analytics/summary
router.get('/summary', async (req, res, next) => {
  try {
    const result = await forwardGetSummary(req.correlationId);
    const trace = getTraceForAction('GET_ANALYTICS', '/api/analytics/summary');
    
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

// GET /api/analytics/care-gaps
router.get('/care-gaps', async (req, res, next) => {
  try {
    const result = await forwardGetCareGapsAnalytics(req.correlationId);
    const trace = getTraceForAction('GET_ANALYTICS', '/api/analytics/care-gaps');
    
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

// GET /api/analytics/claims
router.get('/claims', async (req, res, next) => {
  try {
    const result = await forwardGetClaimsAnalytics(req.correlationId);
    const trace = getTraceForAction('GET_ANALYTICS', '/api/analytics/claims');
    
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

// GET /api/analytics/risk
router.get('/risk', (req, res) => {
  const trace = getTraceForAction('GET_ANALYTICS', '/api/analytics/risk');
  res.status(200).json({
    success: true,
    message: "Risk trends analytics summary retrieved (Simulated Fallback)",
    data: {
      averageRiskScore: 34.2,
      riskDistribution: { LOW: 280, MEDIUM: 122, HIGH: 48 }
    },
    technologyTrace: trace,
    correlationId: req.correlationId
  });
});

module.exports = router;
