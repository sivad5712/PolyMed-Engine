# Notification Service API Contract

**Endpoint:** Healthcare Notification Service (PHP Laravel)
**Default Port:** `8084`

Manages communication dispatch, template interpolation, and patient preferences.

## Endpoint List

### 1. Notifications Workflow
- **POST `/notifications`**
  - Triggers notification delivery to patient or care team.
- **GET `/notifications`**
  - Lists sent/pending notifications.
- **GET `/notifications/{id}`**
  - Fetches specific notification detail and status.

### 2. Templates
- **POST `/notification-templates`**
  - Creates a notification body template with placeholders.
- **GET `/notification-templates`**
  - Lists available templates.

### 3. Preferences & Auditing
- **GET `/notification-preferences/{patientId}`**
  - Fetches preferred delivery channels (SMS, EMAIL, PORTAL).
- **POST `/notification-preferences/{patientId}`**
  - Sets preferences.
- **GET `/notification-audits`**
  - Lists audit trail of communication attempts and deliveries.
- **GET `/health`**
  - Health check endpoint.
