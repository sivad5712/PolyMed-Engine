# API Versioning Strategy

PolyMed Engine utilizes a multi-tiered API versioning structure to maintain stability for internal microservices and external clients.

## Gateway (External APIs)
External routes are versioned via the URI path prefix:
- **Path Versioning**: `/api/v1/...`
- Every route registered on the Express API Gateway maps to `v1` controllers. E.g., `POST /api/v1/patients`.
- Deprecated versions (e.g. `/api/v2/`) would be introduced in parallel when breaking changes occur.

## Downstream Internal Microservices
Downstream internal microservices use relative paths without versioning inside their app context, and the gateway maps path routing accordingly.
- Patient Management: `/patients`
- Risk Scoring: `/risk`
- Claims Service: `/claims`
- Analytics: `/analytics`
- Notifications: `/notifications`
This decouples the external API Gateway contract from the internal service contracts, permitting the gateway to translate models if needed.
