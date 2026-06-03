# Healthcare Request Flow

This document details the lifecycle of a request as it traverses the **PolyMed Engine** polyglot backend suite.

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant Gateway as Node.js API Gateway
    participant PatientService as Java Spring Boot Patient Service
    participant RiskService as Scala Risk Scoring Service
    participant ClaimsService as Django Claims Service
    participant NotificationService as Laravel Notification Service
    participant AnalyticsService as Flask Analytics Service

    Client->>Gateway: POST /api/patients (register patient)
    Note over Gateway: Generate Correlation ID & Log request
    Gateway->>PatientService: Forward Patient Registration DTO
    Note over PatientService: Verify Spring Security role checks
    PatientService-->>Gateway: Return Patient Profile + 201 Created
    Gateway-->>Client: Send JSON Response with Correlation ID

    Client->>Gateway: POST /api/risk/score
    Gateway->>RiskService: Evaluate clinical risk inputs
    Note over RiskService: Run pure functional rules pipeline
    RiskService-->>Gateway: Return Calculated Risk Score
    Gateway-->>Client: Send Risk Decision Response
```

## Step-by-Step Flow Details

1. **Gateway Request Ingestion**: The client requests an API route on port `8080`.
   - The Gateway creates a unique `X-Correlation-ID` header.
   - It runs field validation (validators check for missing fields and type correctness).
   - It logs the incoming request info (method, path, correlation ID, timestamp).

2. **Downstream Routing & Access Control**: The gateway routes requests to the designated microservices:
   - **Java Patient Service**: Spring Security validates the roles provided in headers. Hibernate entities are updated in the repository, and audits are recorded.
   - **Scala Risk Service**: Risk assessment details are processed using stateless rules.
   - **Django Claims Service**: Validates claims and logs audit changes.
   - **Laravel Notification Service**: Triggers SMS/Email workflows based on patient settings.
   - **Flask Analytics Service**: Combines metadata to report KPIs.
