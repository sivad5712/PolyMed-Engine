# Service Boundaries

This document defines the clear boundaries, responsibilities, and data ownership rules for each service in the **PolyMed Engine** ecosystem.

## 1. API Gateway (Node.js/Express)
- **Ownership**: External communication, client authentication, request validation, global rate limiting, correlation ID injection, routing.
- **Boundaries**: Does not contain database entities or business logic. It delegates all domain operations downstream.

## 2. Patient Service (Java/Spring Boot)
- **Ownership**: Primary authority on patient profiles, demographic records, provider metadata, clinical care team assignments, care gaps list, and HIPAA access logs.
- **Boundaries**: Does not calculate claims payment values or process patient notifications directly.

## 3. Clinical Risk Scoring Service (Scala)
- **Ownership**: Encapsulates clinical risk scoring rules and risk categorization algorithms.
- **Boundaries**: Strictly stateless. It takes clinical inputs, evaluates rules functionally, and outputs scores. It doesn't persist data.

## 4. Claims Workflow Service (Django)
- **Ownership**: Medical claims, CPT billing codes validation, claims status history, and insurance member policies.
- **Boundaries**: Does not manage direct patient contact info.

## 5. Healthcare Analytics Service (Flask)
- **Ownership**: Compilation of KPIs across all microservices (throughput, denial rates, provider workloads).
- **Boundaries**: Read-only aggregations. It does not write clinical data.

## 6. Notification Service (PHP/Laravel)
- **Ownership**: Messaging templates, quiet hours delivery settings, patient contact channels preference, and communication log history.
- **Boundaries**: Does not dictate clinical risk scoring or claims status logic.

## Why Boundaries Matter in Healthcare
Clear domain boundaries ensure HIPAA compliance and limit scope. If a security vulnerability occurs in the Notification service, patient clinical charts in the Patient service remain isolated and protected.
