# API Contracts Hub

This document defines standard API principles across the **PolyMed Engine** backend suite and serves as a directory linking to the service contracts.

## API Design Standards

1. **Protocol**: All APIs are HTTP/RESTful communicating via JSON payloads.
2. **Payload Envelope**: All endpoints wrap payloads inside standard success or error schemas.
3. **Correlation ID**: The `X-Correlation-ID` header must be accepted and logged by all downstream microservices.

## Standard Envelopes

- **Success Response Spec**: [standard-success-response.md](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/standards/standard-success-response.md)
- **Error Response Spec**: [standard-error-response.md](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/standards/standard-error-response.md)

## Service Specific Contracts

1. **API Gateway**: [gateway-contract.md](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/contracts/gateway-contract.md)
2. **Patient Management**: [patient-service-contract.md](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/contracts/patient-service-contract.md)
3. **Clinical Risk Scoring**: [risk-scoring-service-contract.md](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/contracts/risk-scoring-service-contract.md)
4. **Claims Workflow**: [claims-service-contract.md](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/contracts/claims-service-contract.md)
5. **Healthcare Analytics**: [analytics-service-contract.md](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/contracts/analytics-service-contract.md)
6. **Notification Engine**: [notification-service-contract.md](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/contracts/notification-service-contract.md)
