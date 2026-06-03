# Standard Error Response Format

All downstream services in the PolyMed Engine suite must return error responses conforming to this JSON specification.

## JSON Schema

```json
{
  "success": false,
  "errorCode": "VALIDATION_ERROR",
  "message": "Required field is missing",
  "details": [
    {
      "field": "lastName",
      "issue": "Field must not be empty"
    }
  ],
  "correlationId": "corr-1001"
}
```

## Field Glossary

- `success`: Always `false`.
- `errorCode`: Machine-readable classification string (e.g., `VALIDATION_ERROR`, `RESOURCE_NOT_FOUND`, `UNAUTHORIZED_ACCESS`, `BUSINESS_RULE_VIOLATION`, `GATEWAY_TIMEOUT`, `INTERNAL_SERVER_ERROR`).
- `message`: User-friendly descriptive summary of the problem.
- `details`: (Optional) Array of objects detailing specific problems, useful for form validation issues.
- `correlationId`: A unique tracing ID propagated from the API gateway down through the services.
