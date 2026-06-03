# Claims Workflow Service (Django)

Manages members, providers, and healthcare claim adjudication states.

## Tech Stack
- Python 3.10+
- Django 4.2+
- SQLite (Local development database)

## Endpoints
- `GET /members`
- `GET /members/{id}`
- `POST /claims` (Submission)
- `GET /claims` (Listing)
- `POST /claims/{id}/status` (Adjudication)
- `GET /claim-audits` (Adjudication logs)

## Running Locally
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8082
```
By default, the service listens on port `8082`.
