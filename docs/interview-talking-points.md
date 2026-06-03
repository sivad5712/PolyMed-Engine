# Interview Talking Points

This document provides ready-made discussion templates for interviewers and hiring managers to review when evaluating this repository.

## 1. Why PolyMed Engine was built
PolyMed Engine was built to demonstrate an enterprise-grade polyglot architectural design for high-compliance health-tech services. It showcases clean isolation, strict API contracts, role-based access validation, and trace propagation without bloated third-party dependencies.

## 2. Decoupled Service Selection
- **Java/Spring Boot** was chosen for Patient and Provider management because of its strong type system and deep enterprise support, ensuring HIPAA-compliant entity modeling and auditing are bulletproof.
- **Scala** is used for clinical risk calculation because risk assessment is inherently mathematical and rule-heavy. Scala's pattern matching and side-effect-free functional programming style ensure scoring logic is robust and testable.
- **Node/Express** acts as the API Gateway due to its low-latency, event-driven architecture, which handles routing, validation, and tracing propagation with minimal overhead.
- **Django** handles claims because its built-in admin interface and database migration tools excel at data-heavy, relational claims tracking and state machines.
- **Flask** serves lightweight analytical aggregation APIs efficiently without ORM overhead.
- **Laravel**'s elegant syntax, template rendering, and mail/SMS drivers make it a perfect fit for managing multi-channel patient and care team communications.

## 3. Correlation ID & Observability
Every request passing through the API Gateway is stamped with a unique `X-Correlation-ID`. This header is passed down to all microservices, allowing for easy distributed tracing through unified logs across the polyglot stack.

## 4. In-Memory Thread-Safe Repositories
Since external databases are intentionally excluded to keep the project light and focused, we designed thread-safe in-memory stores in Java, Python, PHP, and Node. This demonstrates clean repository patterns and concurrency safety while keeping local deployment straightforward.
