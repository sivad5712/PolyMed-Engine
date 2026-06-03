const express = require('express');
const router = express.Router();
const { buildSuccess } = require('../utils/responseBuilder');
const { getServiceCatalog } = require('../services/serviceCatalogService');
const { getBackendStackMap, getTraceForAction } = require('../services/technologyTraceService');
const { getWorkflowMap } = require('../services/workflowMapService');

const PATIENT_SERVICE_URL = process.env.PATIENT_SERVICE_URL || 'http://localhost:8081';
const CLAIMS_SERVICE_URL = process.env.CLAIMS_SERVICE_URL || 'http://localhost:8082';
const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'http://localhost:8083';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:8084';

// GET /api/platform/health
router.get('/health', async (req, res, next) => {
  const serviceStatus = {
    patientService: "UNKNOWN",
    claimsService: "UNKNOWN",
    analyticsService: "UNKNOWN",
    notificationService: "UNKNOWN"
  };

  const ping = async (url) => {
    try {
      const resp = await fetch(`${url}/health`, { signal: AbortSignal.timeout(1000) });
      return resp.ok ? "UP" : "DOWN";
    } catch {
      return "DOWN";
    }
  };

  serviceStatus.patientService = await ping(PATIENT_SERVICE_URL);
  serviceStatus.claimsService = await ping(CLAIMS_SERVICE_URL);
  serviceStatus.analyticsService = await ping(ANALYTICS_SERVICE_URL);
  serviceStatus.notificationService = await ping(NOTIFICATION_SERVICE_URL);

  const status = Object.values(serviceStatus).every(s => s === "UP") ? "HEALTHY" : "DEGRADED";

  const trace = getTraceForAction('GET_ANALYTICS', '/api/platform/health');

  buildSuccess(res, 200, "API Gateway is operational", {
    status,
    services: serviceStatus
  }, req.correlationId, trace);
});

// GET /api/platform/services
router.get('/services', (req, res) => {
  const catalog = getServiceCatalog();
  const trace = getTraceForAction('GET_ANALYTICS', '/api/platform/services');
  buildSuccess(res, 200, "Service Catalog retrieved successfully", catalog, req.correlationId, trace);
});

// GET /api/platform/technology-stack
router.get('/technology-stack', (req, res) => {
  const stack = getBackendStackMap();
  const trace = getTraceForAction('GET_ANALYTICS', '/api/platform/technology-stack');
  buildSuccess(res, 200, "Backend technology stack details retrieved", { stack }, req.correlationId, trace);
});

// GET /api/platform/workflows
router.get('/workflows', (req, res) => {
  const workflows = getWorkflowMap();
  const trace = getTraceForAction('GET_ANALYTICS', '/api/platform/workflows');
  buildSuccess(res, 200, "Healthcare platform workflows map retrieved", workflows, req.correlationId, trace);
});

// GET /api/platform/technology-trace
router.get('/technology-trace', (req, res) => {
  const sampleTrace = getTraceForAction('EVALUATE_RISK', '/api/risk/score');
  buildSuccess(res, 200, "Sample technology trace metadata retrieved", { sampleTrace }, req.correlationId, sampleTrace);
});

module.exports = router;
