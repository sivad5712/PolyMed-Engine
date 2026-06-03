# Patient Service (Java & Spring Boot)

Core patient and provider management module of the **PolyMed Engine** backend suite.

## Tech Stack
- Java 17
- Spring Boot 3.x
- Spring MVC
- Spring Security (Header role-based authentication)
- Hibernate / Spring Data JPA (leveraging in-memory H2 database)

## Key Endpoints
- `POST /patients` (ADMIN)
- `GET /patients/{id}` (CLINICIAN, CARE_MANAGER, CLAIMS_REVIEWER)
- `GET /patients/member/{id}` (CLINICIAN, CARE_MANAGER, CLAIMS_REVIEWER)
- `GET /clinical-summary/{id}` (CLINICIAN)
- `GET /audit-records` (AUDITOR)

## Running Locally
```bash
mvn compile
mvn spring-boot:run
```
By default, the service listens on port `8081`.
