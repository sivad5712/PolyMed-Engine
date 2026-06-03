# API Gateway Contract

**Endpoint:** API Gateway (Node.js/Express)
**Default Port:** `8080`

The Gateway receives external requests, injects `X-Correlation-ID` header, performs request validation, and routes downstream.

## Endpoint List

### 1. Platform
- **GET `/api/platform/health`**
  - **Description:** Returns cumulative status of all downstream services.
  - **Success Response:** `200 OK`
    ```json
    {
      "success": true,
      "message": "API Gateway is operational",
      "data": {
        "status": "HEALTHY",
        "services": {
          "patientService": "UP",
          "riskService": "UP",
          "claimsService": "UP",
          "analyticsService": "UP",
          "notificationService": "UP"
        }
      },
      "correlationId": "corr-391823"
    }
    ```

### 2. Patient Services
- **POST `/api/patients`**
  - **Description:** Route to Patient Management Service to register a patient.
  - **Payload:** See [patient-payloads.json](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/payloads/patient-payloads.json) -> `createPatientRequest`
- **GET `/api/patients/:patientId`**
  - **Description:** Route to Patient Management Service to retrieve patient profile.
- **GET `/api/providers`**
  - **Description:** Retrieve available healthcare providers.
- **GET `/api/care-gaps/:patientId`**
  - **Description:** Retrieve current open/closed gaps in care for patient.

### 3. Risk Services
- **POST `/api/risk/score`**
  - **Description:** Route to Clinical Risk Scoring Service.
  - **Payload:** See [risk-scoring-payloads.json](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/payloads/risk-scoring-payloads.json) -> `mediumRiskPatientInput`

### 4. Claims Services
- **POST `/api/claims`**
  - **Description:** Submit a medical claim.
  - **Payload:** See [claims-payloads.json](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/payloads/claims-payloads.json) -> `claimSubmission`
- **POST `/api/claims/:claimId/status`**
  - **Description:** Update status of a claim.

### 5. Analytics Services
- **GET `/api/analytics/summary`**
  - **Description:** Retrieve high level dashboard statistics.

### 6. Notification Services
- **POST `/api/notifications`**
  - **Description:** Queue and dispatch notifications.
  - **Payload:** See [notification-payloads.json](file:///Users/SivaD/Desktop/PolyMed%20Engine/shared/payloads/notification-payloads.json) -> `patientNotification`
