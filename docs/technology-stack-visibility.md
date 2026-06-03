# Technology Stack Visibility

This guide describes the mechanisms deployed in **PolyMed Engine** to expose, track, and document our polyglot backend technologies.

## 1. Dynamic Technology Tracing
Every HTTP response returned by our API routes contains a `technologyTrace` key. This metadata block describes:
- **Service Name**: e.g., "Patient Management Service".
- **Module Directory**: e.g., "patient-service-java-springboot".
- **Technology List**: specific framework components used (Spring Security, Hibernate, etc.).
- **Decision Rationale**: why this specific stack is the standard choice for this domain.

## 2. Platform Catalog APIs
The API Gateway exposes direct endpoints mapping the technical layout:
- **GET `/api/platform/technology-stack`**: Maps all 12 backend technologies to their purpose.
- **GET `/api/platform/services`**: Lists services, ports, and access role constraints.
- **GET `/api/platform/workflows`**: Lists sequence mapping for patient onboarding, risk calculations, and claim adjudication steps.

## 3. Interactive Visual Console (`/console`)
Visiting `http://localhost:3000/console` compiles this JSON metadata into a unified developer dashboard, making the service catalog, stack maps, and clinical rules calculations visible at a single glance.
