# Clinical Risk Scoring Service (Scala)

Pure functional rule engine responsible for analyzing patient clinical markers and calculating health risk index (0-100).

## Tech Stack
- Scala 2.13
- SBT (Scala Build Tool)
- ScalaTest

## Clinical Risk Rules
1. **Chronic Conditions**: 3+ chronic conditions add 20 points.
2. **Hospitalization History**: 15 points per recent admission (max 30).
3. **Medication Compliance**: Adherence rate below 80% adds 15 points.
4. **Claims Utilization**: 20+ claims in history adds 10 points.
5. **Care Gaps**: Any outstanding open care gap adds 5 points.
6. **Vitals/Biometrics**: Elevated BP adds 5 points; elevated Fasting Blood Sugar adds 5.5 points.

## Running Locally
```bash
sbt run
```
This runs the local console runner evaluating low-risk, medium-risk, and high-risk patients.
