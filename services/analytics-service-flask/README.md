# Healthcare Analytics Service (Flask)

Lightweight reporting engine providing dashboard summary KPIs, risk trends, and compliance metrics across the **PolyMed Engine** ecosystem.

## Tech Stack
- Python 3.10+
- Flask 3.x

## Key APIs
- `GET /analytics/dashboard-summary`
- `GET /analytics/risk-trends`
- `GET /analytics/claims-summary`
- `GET /analytics/care-gap-summary`
- `GET /analytics/provider-workload`
- `GET /analytics/notification-summary`
- `GET /analytics/platform-kpis`

## Running Locally
```bash
pip install -r requirements.txt
flask run --port=8083
```
By default, the service listens on port `8083`.
