const fs = require('fs');
const path = require('path');

const traceMappings = {
  "CREATE_PATIENT": {
    "service": "Patient Management Service",
    "module": "patient-service-java-springboot",
    "technologyStack": ["Java", "Spring Boot", "Spring MVC", "Spring Security", "Hibernate"],
    "businessDomain": "Patient and Member Management",
    "whyThisStack": "This stack is used for structured enterprise healthcare APIs, role-based access, layered service design, and entity modeling.",
    "architectureRole": "Domain service responsible for managing patient demographic and care team configurations."
  },
  "GET_PATIENT": {
    "service": "Patient Management Service",
    "module": "patient-service-java-springboot",
    "technologyStack": ["Java", "Spring Boot", "Spring MVC", "Spring Security", "Hibernate"],
    "businessDomain": "Patient and Member Management",
    "whyThisStack": "Leverages Spring Boot controllers and Hibernate mapping for rapid, safe retrieval of patient charts.",
    "architectureRole": "Domain service responsible for patient record retrieval."
  },
  "EVALUATE_RISK": {
    "service": "Clinical Risk Scoring Service",
    "module": "risk-scoring-service-scala",
    "technologyStack": ["Scala"],
    "businessDomain": "Clinical Risk Scoring",
    "whyThisStack": "Scala is used for clinical risk scoring because of its pure functional rule evaluation capabilities, type-safety, and side-effect-free math execution.",
    "architectureRole": "Domain service responsible for executing clinical algorithms on patient metrics."
  },
  "SUBMIT_CLAIM": {
    "service": "Claims Workflow Service",
    "module": "claims-service-django",
    "technologyStack": ["Django"],
    "businessDomain": "Healthcare Claims Workflow",
    "whyThisStack": "Django models structure claims workflows, relational diagnostic mappings, and reviewer workflows cleanly.",
    "architectureRole": "Domain service responsible for healthcare claims processing."
  },
  "ADJUDICATE_CLAIM": {
    "service": "Claims Workflow Service",
    "module": "claims-service-django",
    "technologyStack": ["Django"],
    "businessDomain": "Healthcare Claims Workflow",
    "whyThisStack": "Uses Django database models and views to update, review, approve, or deny claims natively.",
    "architectureRole": "Domain service responsible for claim state adjudication transitions."
  },
  "GET_ANALYTICS": {
    "service": "Healthcare Analytics Service",
    "module": "analytics-service-flask",
    "technologyStack": ["Flask"],
    "businessDomain": "Healthcare Analytics",
    "whyThisStack": "Flask serves lightweight analytics JSON aggregation APIs efficiently without heavy framework boilerplate.",
    "architectureRole": "Service exposing dashboard KPI and trend reports."
  },
  "DISPATCH_NOTIFICATION": {
    "service": "Notification Service",
    "module": "notification-service-laravel",
    "technologyStack": ["PHP", "Laravel"],
    "businessDomain": "Notifications & Preferences",
    "whyThisStack": "Laravel manages message templates interpolation, communication audit logs, and delivery preference configurations.",
    "architectureRole": "Service responsible for dispatching patient and care team alerts."
  }
};

function getTraceForAction(action, requestPath) {
  const base = traceMappings[action] || {
    "service": "API Gateway",
    "module": "api-gateway-node-express",
    "technologyStack": ["Node.js", "Express.js"],
    "businessDomain": "Platform Routing",
    "whyThisStack": "Node and Express handle lightweight, asynchronous HTTP routing with high efficiency.",
    "architectureRole": "Central API Gateway entry point."
  };

  return {
    action,
    ...base,
    requestPath
  };
}

function getBackendStackMap() {
  try {
    const filePath = path.join(__dirname, '../../../../shared/technology-catalog/backend-stack-map.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    return [];
  }
}

module.exports = {
  getTraceForAction,
  getBackendStackMap
};
