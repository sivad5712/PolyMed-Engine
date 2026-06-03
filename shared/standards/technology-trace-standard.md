# Technology Trace Standard

This standard enforces the `technologyTrace` property in every JSON response returned by the **PolyMed Engine** ecosystem. 

## JSON Specification

```json
{
  "technologyTrace": {
    "action": "CREATE_PATIENT",
    "service": "Patient Management Service",
    "module": "patient-service-java-springboot",
    "technologyStack": [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Hibernate"
    ],
    "businessDomain": "Patient and Member Management",
    "whyThisStack": "Used for enterprise healthcare workflows that require structured controllers, role-based access, layered architecture, and entity modeling.",
    "requestPath": "/api/patients",
    "architectureRole": "Domain service responsible for managing patient demographic and care team configurations."
  }
}
```

## Mandatory Fields
- `action`: High-level operational keyword (e.g. `CREATE_PATIENT`, `EVALUATE_RISK`, `ADJUDICATE_CLAIM`).
- `service`: Human-readable service name.
- `module`: Target directory identifier.
- `technologyStack`: Array listing the specific technologies utilized.
- `businessDomain`: Healthcare operational sector.
- `whyThisStack`: Rationale explaining the architectural suitability.
- `requestPath`: Path targeted.
- `architectureRole`: Description of the service's role within the platform.
