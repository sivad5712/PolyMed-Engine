# Error Handling Architecture

PolyMed Engine implements uniform error handling across all six backend frameworks. This ensures clients receive a consistent contract, regardless of which microservice raised the error.

## 1. Standard Error Response
Every error payload returns `success: false` and includes a tracing `correlationId`, a generic `errorCode`, and a detailed `message`.

```json
{
  "success": false,
  "errorCode": "RESOURCE_NOT_FOUND",
  "message": "Patient with ID pat-999 not found",
  "details": [],
  "correlationId": "corr-482910"
}
```

## 2. Error Classifications

### Validation Errors (`VALIDATION_ERROR`)
- **Occurs at**: API Gateway or Entry controllers.
- **Trigger**: Missing fields, incorrect email formats, or out-of-bound numerical ranges.
- **Response Code**: `400 Bad Request`

### Service Errors (`INTERNAL_SERVER_ERROR`)
- **Occurs at**: Uncaught runtime exceptions inside microservices.
- **Trigger**: Internal logic failures, unexpected null values, file permission issues.
- **Response Code**: `500 Internal Server Error`

### Business Rule Errors (`BUSINESS_RULE_VIOLATION`)
- **Occurs at**: Domain service layers.
- **Trigger**: Submitting a claim for an inactive member, or setting notification preferences without valid contact fields.
- **Response Code**: `422 Unprocessable Entity`
