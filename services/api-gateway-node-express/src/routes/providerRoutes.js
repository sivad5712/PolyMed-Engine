const express = require('express');
const router = express.Router();
const { forwardGetProviders } = require('../services/patientGatewayService');
const { getTraceForAction } = require('../services/technologyTraceService');

// GET /api/providers
router.get('/', async (req, res, next) => {
  try {
    const result = await forwardGetProviders(req.correlationId);
    const trace = getTraceForAction('GET_PATIENT', '/api/providers');
    
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

module.exports = router;
