const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation');
const { forwardGetMembers, forwardSubmitClaim, forwardUpdateClaimStatus } = require('../services/claimsGatewayService');
const { getTraceForAction } = require('../services/technologyTraceService');

// GET /api/claims/members
router.get('/members', async (req, res, next) => {
  try {
    const result = await forwardGetMembers(req.correlationId);
    const trace = getTraceForAction('SUBMIT_CLAIM', '/api/claims/members');
    
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

// POST /api/claims
router.post('/', validation('claim'), async (req, res, next) => {
  try {
    const result = await forwardSubmitClaim(req.body, req.correlationId);
    const trace = getTraceForAction('SUBMIT_CLAIM', '/api/claims');
    
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

// POST /api/claims/:claimId/status
router.post('/:claimId/status', async (req, res, next) => {
  try {
    const result = await forwardUpdateClaimStatus(req.params.claimId, req.body, req.correlationId);
    const trace = getTraceForAction('ADJUDICATE_CLAIM', `/api/claims/${req.params.claimId}/status`);
    
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

// GET /api/claims/audit
router.get('/audit', async (req, res, next) => {
  try {
    const trace = getTraceForAction('SUBMIT_CLAIM', '/api/claims/audit');
    res.status(200).json({
      success: true,
      message: "Claims audit log list retrieved (Simulated Fallback)",
      data: {
        audits: [
          { claimId: "clm-55902", action: "SUBMITTED", username: "claims_entry_clerk", timestamp: "2026-06-02T12:00:00Z" }
        ]
      },
      technologyTrace: trace,
      correlationId: req.correlationId
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
