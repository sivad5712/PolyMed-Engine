# Naming Conventions

To ensure consistency across PolyMed Engine's polyglot backend suite, the following conventions are strictly enforced:

## URI Path Naming
- Use **kebab-case** for resources and paths.
  - Good: `/api/care-gaps`
  - Bad: `/api/careGaps`, `/api/care_gaps`
- Resources should be **plural** nouns.
  - Good: `/patients`, `/providers`, `/claims`
  - Bad: `/patient`, `/provider`, `/claim`

## JSON Properties
- Use **camelCase** for JSON key properties.
  - Good: `patientId`, `medicationAdherenceRate`
  - Bad: `patient_id`, `MedicationAdherenceRate`

## HTTP Methods
- **GET**: Retrieve resource representation. Must be idempotent and safe.
- **POST**: Create a resource or execute a non-idempotent operation (e.g., scoring calculation).
- **PUT**: Fully replace an existing resource.
- **PATCH**: Partial updates to resources.
- **DELETE**: Remove resources.
