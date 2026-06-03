/**
 * Standard HTTP JSON response builder including technologyTrace logic.
 */

const { getTraceForAction } = require('../services/technologyTraceService');

function buildSuccess(res, status, message, data, correlationId, trace) {
  // If trace is not explicitly passed, compile a default one or mock one
  const techTrace = trace || getTraceForAction('API_REQUEST', res.req.originalUrl);

  return res.status(status).json({
    success: true,
    message,
    data: data || {},
    technologyTrace: techTrace,
    correlationId: correlationId || 'corr-unknown'
  });
}

function buildError(res, status, errorCode, message, details, correlationId, trace) {
  const techTrace = trace || getTraceForAction('API_REQUEST', res.req.originalUrl);

  return res.status(status).json({
    success: false,
    errorCode,
    message,
    details: details || [],
    technologyTrace: techTrace,
    correlationId: correlationId || 'corr-unknown'
  });
}

module.exports = {
  buildSuccess,
  buildError
};
