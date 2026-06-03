# Security Design

This document details the security and access control design of the **PolyMed Engine**.

## 1. Spring Security Role-Based Access Control
The **Patient Management Service** enforces strict role-based constraints. We configure standard Spring Security filters to validate roles. Because external Identity Providers (IDPs) are excluded by the constraint set, we model roles using HTTP Headers (e.g. `X-Role-Header` or Basic Auth simulations):
- `ADMIN`: Write access to all profiles.
- `CLINICIAN`: Read-write access to medical summaries and care team assignments.
- `CARE_MANAGER`: Can view patient charts and manage care gaps.
- `CLAIMS_REVIEWER`: Basic read access for claims matching.
- `AUDITOR`: Full access to the `/audit-records` endpoints, zero access to modify medical summaries.

## 2. API Gateway Validation Concept
The Gateway acts as the first line of defense:
- Inbound parameters must match types (e.g., date formats, NPI 10-digit requirements).
- Prevents invalid request formats from reaching the internal microservices.

## 3. Auditing & Compliance
HIPAA requires tracking access to Patient Protected Health Information (PHI). We implement an `AuditService` in the Patient Service that records:
- The username/ID.
- The action (e.g., `READ_PATIENT_SUMMARY`).
- The patient ID.
- Timestamp and Correlation ID.

## 4. Production Security Enhancements
For production ready environments, we would add:
- HTTPS/TLS termination at the API Gateway.
- OAuth2 with JWT validation via Keycloak.
- Database level column encryption for sensitive fields like SSN or birthdates.
