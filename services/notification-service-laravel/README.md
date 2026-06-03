# Notification Service (PHP & Laravel)

Responsible for templating, dispatch tracking, quiet hours preferences, and communication auditing across the **PolyMed Engine** ecosystem.

## Tech Stack
- PHP 8.1+
- Laravel 10.x

## Key APIs
- `POST /notifications` (Dispatch reminder/alert)
- `GET /notifications` (Listing history)
- `GET /notifications/{id}` (Details)
- `POST /notification-templates` (Add message format template)
- `GET /notification-preferences/{patientId}` (Fetch quiet hours / channel choices)
- `POST /notification-preferences/{patientId}` (Update preferences)
- `GET /notification-audits` (Auditing list)

## Running Locally
```bash
php artisan serve
```
By default, the service listens on port `8084`.
