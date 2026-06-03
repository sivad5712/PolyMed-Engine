# Polyglot Backend Strategy

Choosing the correct tool for each business domain optimizes development speed, runtime performance, and system robustness. This document explains the strategy behind the **PolyMed Engine** polyglot architecture.

| Service | Technology | Rationale |
| :--- | :--- | :--- |
| **API Gateway** | Node.js / Express.js | Event-driven, non-blocking I/O model makes it highly efficient for routing, rate limiting, and request transformation. |
| **Patient & Member Management** | Java / Spring Boot / Hibernate | Enterprise-grade type safety, strict transaction management, and mature ORM (Hibernate) for modeling complex HIPAA-compliant patient entity graphs. |
| **Clinical Risk Scoring** | Scala | Functional programming paradigm is ideal for writing side-effect-free, mathematical risk rules and pipelines that are testable and deterministic. |
| **Claims Workflow** | Python / Django | Out-of-the-box admin panel, database migrations, and clean model relationships make it highly suitable for building multi-step claims approval workflows. |
| **Healthcare Analytics** | Python / Flask | Light-weight and rapid setup suitable for exposing read-only data aggregation endpoints and analytics summary metrics. |
| **Notification Engine** | PHP / Laravel | High productivity framework with built-in mailers, template engines, and queues, enabling fast notification template and delivery management. |

## Architectural Tradeoffs
- **Pros**: Services are highly decoupled; developers can use the best tool for the specific job; team scaling is easier.
- **Cons**: Overhead of maintaining multiple runtimes (JVM, Node, Python, PHP); complex deployment orchestration; necessity for unified logging and correlation tracing across runtime boundaries (solved here via `X-Correlation-ID` middleware).
