const express = require('express');
const correlationId = require('./middleware/correlationId');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

// Console rendering
const { getConsolePageHtml } = require('./console/consolePage');
const { getServiceCatalog } = require('./services/serviceCatalogService');
const { getBackendStackMap } = require('./services/technologyTraceService');
const { getWorkflowMap } = require('./services/workflowMapService');

// Routes
const platformRoutes = require('./routes/platformRoutes');
const patientRoutes = require('./routes/patientRoutes');
const providerRoutes = require('./routes/providerRoutes');
const riskRoutes = require('./routes/riskRoutes');
const claimsRoutes = require('./routes/claimsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const path = require('path');
const app = express();

// Standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Trace identification & logging middlewares
app.use(correlationId);
app.use(requestLogger);

// Developer Console HTML endpoint
app.get('/console', (req, res) => {
  const catalog = getServiceCatalog().services;
  const stack = getBackendStackMap();
  const workflows = getWorkflowMap().workflows;
  
  const html = getConsolePageHtml(catalog, stack, workflows);
  res.send(html);
});

// Mount API routes
app.use('/api/platform', platformRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 Route Not Found
app.use((req, res, next) => {
  const err = new Error(`Cannot ${req.method} ${req.originalUrl}`);
  err.status = 404;
  err.code = 'ROUTE_NOT_FOUND';
  next(err);
});

// Central Error Handler
app.use(errorHandler);

module.exports = app;
