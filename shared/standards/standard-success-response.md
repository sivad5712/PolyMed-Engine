# Standard Success Response Format

All downstream services in the PolyMed Engine suite must return successful responses conforming to this JSON specification.

## JSON Schema

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {},
  "correlationId": "corr-1001"
}
```

## Field Glossary

- `success`: Always `true`.
- `message`: User-friendly descriptive summary of the completed action.
- `data`: Object containing payload results. Must be empty (`{}`) or a key-value structure (cannot be a raw JSON array; arrays must be nested under a plural property inside the object).
- `correlationId`: A unique tracing ID propagated from the API gateway down through the services.
