const { buildError } = require('../utils/responseBuilder');

/**
 * Global Error Handler Middleware
 */
function errorHandler(err, req, res, next) {
  console.error(`[GATEWAY ERROR] CorrelationID: ${req.correlationId} - ${err.stack}`);
  
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const msg = err.message || 'An unexpected error occurred on the gateway';

  buildError(res, status, code, msg, [], req.correlationId);
}

module.exports = errorHandler;
