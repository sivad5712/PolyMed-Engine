/**
 * PolyMed Engine API Gateway Entrypoint
 */

const app = require('./app');

const PORT = process.env.GATEWAY_PORT || 3000;

app.listen(PORT, () => {
  console.log(`=============================================================`);
  console.log(`  PolyMed Engine API Gateway listening on port ${PORT}`);
  console.log(`  Developer Console URL: http://localhost:${PORT}/console`);
  console.log(`  Mode: Multi-microservice proxy routing with local fallback`);
  console.log(`=============================================================`);
});
