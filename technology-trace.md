# Technology Trace Architecture

To guarantee maximum visibility and alignment between our polyglot services and our technology stack, **PolyMed Engine** implements a **Technology Trace** metadata object in all API responses.

## Purpose
In a polyglot microservice platform, it can be difficult for recruiters and technical reviewers to immediately verify where a request was routed and which technical components were involved. The Technology Trace makes this explicit:
- Inspect request pathways dynamically.
- Understand the rationale behind each framework selection.
- Verify role assignments and service ownership instantly.

## Schema Format
Every success or error response wraps its data alongside this metadata block:

```json
{
  "technologyTrace": {
    "action": "EVALUATE_RISK",
    "service": "Clinical Risk Scoring Service",
    "module": "risk-scoring-service-scala",
    "technologyStack": ["Scala"],
    "businessDomain": "Clinical Risk Scoring",
    "whyThisStack": "Scala is used for clinical risk scoring because of its pure functional rule evaluation capabilities, type-safety, and side-effect-free math execution.",
    "requestPath": "/api/risk/score",
    "architectureRole": "Domain service responsible for executing clinical algorithms on patient metrics."
  }
}
```

## Trace propagation
When a client requests a route on the API Gateway, the gateway:
1. Injects a unique `correlationId`.
2. Inspects which downstream microservice will handle the request.
3. appends the correct `technologyTrace` mapping before returning the final response.
This ensures complete traceability without requiring complex distributed telemetry tools.
