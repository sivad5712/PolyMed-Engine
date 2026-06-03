/**
 * Correlation ID Middleware
 * Ensures every incoming request has a unique correlation ID for distributed tracing.
 */
function correlationId(req, res, next) {
  const correlationHeader = req.headers['x-correlation-id'] || req.headers['correlation-id'];
  
  if (correlationHeader) {
    req.correlationId = correlationHeader;
  } else {
    // Generate a simple unique correlation ID
    const randomHex = Math.random().toString(16).substring(2, 10);
    req.correlationId = `corr-${Date.now()}-${randomHex}`;
  }

  // Set response headers so client gets the trace reference
  res.setHeader('X-Correlation-ID', req.correlationId);
  next();
}

module.exports = correlationId;
