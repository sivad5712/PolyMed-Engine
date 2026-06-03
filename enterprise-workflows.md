# Enterprise Healthcare Workflows

This document describes the end-to-end request flow of the five core healthcare workflows in the **PolyMed Engine** ecosystem.

---

## Workflow 1: Patient Onboarding
1. **API Ingestion**: A client POSTs registration parameters to `/api/patients` on the API Gateway (Express).
2. **Field Validation**: Gateway parses parameters and ensures the email is valid and required names are present.
3. **Trace Injection**: Gateway attaches `X-Correlation-ID` and formats the trace header (`action: CREATE_PATIENT`).
4. **Spring Boot Routing**: Gateway forwards the payload to `/patients` on the Spring Boot Service (Port `8081`).
5. **Access Control**: Spring Security verifies the presence of `ROLE_ADMIN` authority.
6. **Entity Mapping**: Hibernate maps the `Patient` entity, registers a `MemberProfile` in H2 database.
7. **Compliance Audit**: The `AuditService` records the demographic read/write action inside the audit ledger.
8. **JSON Response**: Client receives standard payload containing the Java/Spring Boot technology trace.

---

## Workflow 2: Clinical Risk Scoring
1. **API Ingestion**: A care manager submits clinical observations to `/api/risk/score` on Port `3000`.
2. **Rules Processing**: The Gateway forwards the request to the Scala engine rules pipeline.
3. **Functional Rules Adjudication**: Scala evaluates `ChronicConditionRule`, `RecentHospitalizationRule`, `MedicationAdherenceRule`, and newly added `AgeRiskRule` and `EmergencyVisitRule`.
4. **Scoring Compilation**: An aggregate score (0-100) is summed and matched to a tier (LOW, MEDIUM, HIGH) via pattern matching.
5. **JSON Response**: Response returns calculations and rule matches alongside the Scala technology trace.

---

## Workflow 3: Claim Submission & Review
1. **Claim Entry**: A provider submits billing codes to `/api/claims` on the Express gateway.
2. **Django Adjudication**: Request routes to Django (Port `8082`). The Django ORM inserts a `Claim` linked to diagnosis tables.
3. **Workflow State**: Claim states transition from `SUBMITTED` -> `UNDER_REVIEW` -> `APPROVED` or `DENIED` via JSON endpoints.
4. **Log Registry**: The action is recorded in Django's `ClaimAudit` database table.

---

## Workflow 4: Healthcare Analytics
1. **KPI Search**: visiting `/api/analytics/summary` triggers a query to the Flask analytics service (Port `8083`).
2. **Metrics Fetch**: Flask queries aggregates (high risk counts, compliance rates, claims denial rates).
3. **Trace Output**: Response is enveloped with the Flask technology trace.

---

## Workflow 5: Patient Notification
1. **Trigger Alert**: Creating a patient or adjudicating a claim fires a notification request to `/api/notifications`.
2. **Laravel Processing**: Laravel (Port `8084`) evaluates the patient's delivery preferences (SMS, Email, Portal).
3. **Template Interpolation**: Laravel interpolates dynamic placeholders (e.g. `{name}`) inside templates.
4. **Audit**: Access details are stored in the Laravel `NotificationAudit` database.
