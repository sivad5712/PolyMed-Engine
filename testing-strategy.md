# Testing Strategy

This document details the testing architecture and verification protocols for the **PolyMed Engine** services suite.

## 1. Node/Express Gateway Testing
- **Strategy**: Verify routing, middleware integration, error handling, and parameter validations.
- **Methods**: Use standard testing tools like Mocha/Chai or Jest to run unit tests on utils (validators, response formatters).

## 2. Java Spring Boot Testing
- **Strategy**: Verify controller mappings, service logic, DTO translations, and Spring Security filters.
- **Methods**: Spring Boot test annotations (`@SpringBootTest` and `@WebMvcTest`) with MockMvc to simulate authenticated role-based endpoints.

## 3. Scala Clinical Risk Scoring Testing
- **Strategy**: Validate clinical risk scoring math, edge cases (maximum points, boundary tests).
- **Methods**: Standard ScalaTest suite running functional assertions on the rule results pipelines.

## 4. Django & Flask Testing
- **Strategy**: Verify views, json response formatting, logic matching.
- **Methods**: Django's TestCase and Flask's client test runner (`app.test_client()`).

## 5. Laravel Notification Testing
- **Strategy**: Validate model states and API response structures.
- **Methods**: Laravel's PHPUnit framework.

## 6. Manual Verification Checklist
1. Start the API Gateway: `npm start`
2. Test Gateway health: `curl http://localhost:8080/api/platform/health`
3. Test Gateway service catalog: `curl http://localhost:8080/api/platform/services`
4. Post invalid payload and confirm the gateway intercepts it with a validation error response.
