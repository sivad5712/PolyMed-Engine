/**
 * Request body and parameter validators.
 */

function validatePatient(body) {
  const errors = [];
  if (!body.firstName || typeof body.firstName !== 'string') {
    errors.push({ field: 'firstName', issue: 'Must be a non-empty string' });
  }
  if (!body.lastName || typeof body.lastName !== 'string') {
    errors.push({ field: 'lastName', issue: 'Must be a non-empty string' });
  }
  if (!body.email || !body.email.includes('@')) {
    errors.push({ field: 'email', issue: 'Must be a valid email address' });
  }
  if (!body.dateOfBirth || isNaN(Date.parse(body.dateOfBirth))) {
    errors.push({ field: 'dateOfBirth', issue: 'Must be a valid YYYY-MM-DD date' });
  }
  return errors;
}

function validateRiskInput(body) {
  const errors = [];
  if (!body.patientId) {
    errors.push({ field: 'patientId', issue: 'patientId is required' });
  }
  if (body.chronicConditionsCount === undefined || typeof body.chronicConditionsCount !== 'number') {
    errors.push({ field: 'chronicConditionsCount', issue: 'Must be a number' });
  }
  if (body.recentHospitalizations === undefined || typeof body.recentHospitalizations !== 'number') {
    errors.push({ field: 'recentHospitalizations', issue: 'Must be a number' });
  }
  if (body.medicationAdherenceRate === undefined || typeof body.medicationAdherenceRate !== 'number' || body.medicationAdherenceRate < 0 || body.medicationAdherenceRate > 1) {
    errors.push({ field: 'medicationAdherenceRate', issue: 'Must be a decimal percentage between 0.0 and 1.0' });
  }
  return errors;
}

function validateClaim(body) {
  const errors = [];
  if (!body.memberId) {
    errors.push({ field: 'memberId', issue: 'memberId is required' });
  }
  if (!body.providerId) {
    errors.push({ field: 'providerId', issue: 'providerId is required' });
  }
  if (body.totalCharged === undefined || typeof body.totalCharged !== 'number') {
    errors.push({ field: 'totalCharged', issue: 'Must be a numeric charge amount' });
  }
  if (!Array.isArray(body.billingCodes) || body.billingCodes.length === 0) {
    errors.push({ field: 'billingCodes', issue: 'Must be a non-empty array of billing items' });
  }
  return errors;
}

function validateNotification(body) {
  const errors = [];
  if (!body.patientId) {
    errors.push({ field: 'patientId', issue: 'patientId is required' });
  }
  if (!body.type || !['EMAIL', 'SMS', 'PORTAL_ALERT'].includes(body.type)) {
    errors.push({ field: 'type', issue: 'Type must be EMAIL, SMS, or PORTAL_ALERT' });
  }
  if (!body.templateCode) {
    errors.push({ field: 'templateCode', issue: 'templateCode is required' });
  }
  return errors;
}

module.exports = {
  validatePatient,
  validateRiskInput,
  validateClaim,
  validateNotification
};
