# Risk Scoring Service API Contract

**Endpoint:** Clinical Risk Scoring Service (Scala)

Provides functional rule evaluation on patient clinical markers.

## Evaluation Inputs & Outputs

### Input Schema (`PatientRiskInput`)
```json
{
  "patientId": "pat-88291",
  "chronicConditionsCount": 4,
  "recentHospitalizations": 2,
  "medicationAdherenceRate": 0.65,
  "claimsUtilizationCount": 24,
  "openCareGapsCount": 3,
  "systolicBP": 165,
  "diastolicBP": 102,
  "fastingBloodSugar": 180
}
```

### Output Schema (`RiskDecision`)
```json
{
  "patientId": "pat-88291",
  "calculatedScore": 85.5,
  "riskCategory": "HIGH_RISK",
  "evaluationTimestamp": "2026-06-02T17:37:55Z",
  "ruleResults": [
    {
      "ruleName": "CHRONIC_CONDITION_COUNT_RULE",
      "pointsAdded": 20.0,
      "message": "Patient has 4 chronic conditions (threshold: 3+ add 20 points)"
    }
  ],
  "explanation": "Critical clinical status: Multiple chronic conditions..."
}
```

## Clinical Risk Rules Applied
1. **Chronic Condition Count Rule**: Count >= 3 adds 20 points.
2. **Recent Hospitalization Rule**: Each hospitalization in last 12 months adds 15 points (cap at 30).
3. **Medication Adherence Risk Rule**: Adherence < 80% adds 15 points.
4. **High Claims Utilization Rule**: Count >= 20 claims adds 10 points.
5. **Open Care Gap Rule**: Any open care gap adds 5 points.
6. **Abnormal Observation Rule**: Systolic BP > 140 or Diastolic > 90 adds 5 points; Fasting blood sugar > 126 mg/dL adds 5 points.

## Decision Ranges
- **LOW_RISK**: `0` to `30`
- **MEDIUM_RISK**: `31` to `70`
- **HIGH_RISK**: `71` to `100`
