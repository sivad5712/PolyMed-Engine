/**
 * Request Logger Middleware
 * Logs incoming request metadata for tracing.
 */
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [GATEWAY] [${req.method}] ${req.originalUrl} - CorrelationID: ${req.correlationId}`);
  next();
}

module.exports = requestLogger;
