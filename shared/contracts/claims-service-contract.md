# Claims Service API Contract

**Endpoint:** Healthcare Claims Service (Django)
**Default Port:** `8082`

Manages Claim processing, submission, adjudication, status history, and care gap alignment.

## Endpoint List

### 1. Members & Providers
- **GET `/members`**
  - Lists member demographics.
- **GET `/members/{id}`**
  - Details for a member.
- **GET `/providers`**
  - List of providers and their specialties.

### 2. Claims Workflow
- **POST `/claims`**
  - Submits a new healthcare claim.
- **GET `/claims`**
  - Lists claims (filterable by member or status).
- **POST `/claims/{id}/status`**
  - Adjudicates or updates claim status (e.g. APPROVED, DENIED).

### 3. Care Gaps & Audit
- **GET `/care-gaps`**
  - Lists member care gaps.
- **GET `/claim-audits`**
  - View audit logs for claim adjudication actions.
- **GET `/health`**
  - Basic health status checking endpoint.
