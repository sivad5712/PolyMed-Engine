# Local Run Guide

This document describes how to set up and run each service in the **PolyMed Engine** backend suite.

## Prerequisites
- Node.js (v18+)
- Java JDK 17+
- Maven 3.8+
- Scala & SBT (v1.8+)
- Python 3.10+
- PHP (v8.1+) & Composer

---

## 1. Node.js Express API Gateway (Port 8080)
```bash
cd services/api-gateway-node-express
npm install
npm start
```

## 2. Java Spring Boot Patient Service (Port 8081)
```bash
cd services/patient-service-java-springboot
mvn clean compile
mvn spring-boot:run
```

## 3. Scala Clinical Risk Scoring Service (Console Runner)
```bash
cd services/risk-scoring-service-scala
sbt run
```

## 4. Django Claims Service (Port 8082)
```bash
cd services/claims-service-django
pip install -r requirements.txt
python manage.py runserver 8082
```

## 5. Flask Analytics Service (Port 8083)
```bash
cd services/analytics-service-flask
pip install -r requirements.txt
flask run --port=8083
```

## 6. Laravel Notification Service (Port 8084)
```bash
cd services/notification-service-laravel
composer install
php artisan serve --port=8084
```

## Troubleshooting
- **Port Conflict**: If port `8080` (or others) is already in use, kill the process or edit the port variable in the configuration files.
- **Python environments**: It is recommended to use virtual environments (`venv`) for the Django and Flask services.
- **SBT connection errors**: Ensure sbt can download dependencies over HTTPS.
- **Composer packages**: Run `composer install` inside Laravel service directory before starting.
