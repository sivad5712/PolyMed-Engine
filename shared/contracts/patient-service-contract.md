# Patient Service API Contract

**Endpoint:** Patient Management Service (Java Spring Boot)
**Default Port:** `8081`

Manages Patient profiles, Providers, Care Teams, and Patient Clinical Summaries.

## Endpoint List

### 1. Patients
- **POST `/patients`**
  - Registers new patient.
- **GET `/patients/{patientId}`**
  - Returns Patient details.
- **GET `/patients/member/{memberId}`**
  - Returns Member details by memberId.

### 2. Providers & Care Teams
- **POST `/providers`**
  - Registers new healthcare provider.
- **GET `/providers/{providerId}`**
  - Returns Provider profile.
- **POST `/care-teams`**
  - Assigns a care team (primary care or specialty) to a patient.
- **GET `/care-teams/patient/{patientId}`**
  - Returns Care Team assigned to the patient.

### 3. Care Gaps & Clinical Summaries
- **GET `/care-gaps/patient/{patientId}`**
  - Fetches Open/Closed Care Gaps.
- **GET `/clinical-summary/{patientId}`**
  - Fetches Blood Type, Allergies, Chronic Conditions, and Vitals.

### 4. Audit & Infrastructure
- **GET `/audit-records`**
  - Fetches HIPAA access audit trails (Requires `AUDITOR` role).
- **GET `/health`**
  - Returns Spring Boot service health check.

## Spring Security Role Constraints

- **ADMIN**: Can edit/write all profiles (Patient, Provider, Care Teams).
- **CLINICIAN**: Can read Clinical Summaries and Care Teams.
- **CARE_MANAGER**: Can create/read Care Gaps and assign Care Teams.
- **CLAIMS_REVIEWER**: Can read basic Patient/Member demographics for claim adjudication.
- **AUDITOR**: Only role with access to `/audit-records` endpoint.
