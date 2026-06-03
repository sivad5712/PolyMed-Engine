const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation');
const { forwardRegisterPatient, forwardGetPatient } = require('../services/patientGatewayService');
const { getTraceForAction } = require('../services/technologyTraceService');
const { buildSuccess } = require('../utils/responseBuilder');

// POST /api/patients
router.post('/', validation('patient'), async (req, res, next) => {
  try {
    const result = await forwardRegisterPatient(req.body, req.correlationId);
    const trace = getTraceForAction('CREATE_PATIENT', '/api/patients');
    
    // Inject trace
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

// GET /api/patients/:patientId
router.get('/:patientId', async (req, res, next) => {
  try {
    const result = await forwardGetPatient(req.params.patientId, req.correlationId);
    const trace = getTraceForAction('GET_PATIENT', `/api/patients/${req.params.patientId}`);
    
    res.status(result.success ? 200 : 404).json({
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
