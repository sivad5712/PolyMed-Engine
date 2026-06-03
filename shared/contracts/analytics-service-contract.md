# Analytics Service API Contract

**Endpoint:** Healthcare Analytics Service (Flask)
**Default Port:** `8083`

Provides summaries, trends, and KPIs across the platform's domains.

## Endpoint List

### 1. Dashboards
- **GET `/analytics/dashboard-summary`**
  - Aggregated dashboard metric counters.
- **GET `/analytics/risk-trends`**
  - Distribution breakdown of risk scores.
- **GET `/analytics/claims-summary`**
  - Total charged vs paid, denials and throughput.
- **GET `/analytics/care-gap-summary`**
  - Track compliance rate by measure code.
- **GET `/analytics/provider-workload`**
  - Patients and care gaps assigned per provider.
- **GET `/analytics/notification-summary`**
  - Delivery rates and channel preferences.
- **GET `/analytics/platform-kpis`**
  - Gateway latency, health metrics, and requests count.
- **GET `/health`**
  - Returns Flask analytics health status.
