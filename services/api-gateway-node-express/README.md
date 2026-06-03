# PolyMed Engine - API Gateway (Node.js & Express.js)

The central entry point of the **PolyMed Engine** polyglot backend suite.

## Responsibilities
- Routes requests downstream by domain path.
- Handles input validation.
- Injects and propagates correlation IDs (`X-Correlation-ID`) across the system.
- Logs requests and formats standard error/success envelopes.

## Setup & Running
```bash
npm install
npm start
```
By default, the gateway listens on port `8080`.
