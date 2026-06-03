# Developer Console & Service Catalog

To provide hiring managers and technical interviewers with immediate visibility, **PolyMed Engine** exposes a custom-built, backend-served dashboard.

## Access
- **URL**: `http://localhost:3000/console`
- **Source**: Server-rendered directly from Node.js & Express inside the API Gateway (`/src/console/`).

## Dashboard Modules

### 1. Platform Overview
Briefs the user on the architectural goals of PolyMed Engine and lists active environment configurations.

### 2. Service Catalog Registry
Maps each of the six polyglot microservices, detailing:
- The folder location inside the monorepo.
- The default ports they occupy.
- The specific business domain they own.
- Action options that trigger sample HTTP requests to that service.

### 3. Technology Stack Map
Lists all 12 backend technologies (Java, Spring Security, Hibernate, Django, Laravel, etc.) and details their operational purpose.

### 4. Interactive Endpoint Explorer
Lets developers test routes directly from the UI, generating simulated payloads or forwarding requests downstream, printing the output JSON envelope with its trace metadata immediately.
