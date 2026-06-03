const { validatePatient, validateRiskInput, validateClaim, validateNotification } = require('../utils/validators');
const { buildError } = require('../utils/responseBuilder');

function validationMiddleware(type) {
  return (req, res, next) => {
    let errors = [];
    if (type === 'patient') {
      errors = validatePatient(req.body);
    } else if (type === 'risk') {
      errors = validateRiskInput(req.body);
    } else if (type === 'claim') {
      errors = validateClaim(req.body);
    } else if (type === 'notification') {
      errors = validateNotification(req.body);
    }

    if (errors.length > 0) {
      return buildError(res, 400, 'VALIDATION_ERROR', 'Required field is missing or invalid', errors, req.correlationId);
    }
    next();
  };
}

module.exports = validationMiddleware;
