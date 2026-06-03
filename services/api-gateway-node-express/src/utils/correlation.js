/**
 * Tracing Correlation Utilities
 */

function generateCorrelationId() {
  const randomHex = Math.random().toString(16).substring(2, 10);
  return `corr-${Date.now()}-${randomHex}`;
}

module.exports = {
  generateCorrelationId
};
