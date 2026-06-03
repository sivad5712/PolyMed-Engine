package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

object MedicationAdherenceRule extends RiskRule {
  override def evaluate(input: PatientRiskInput): Option[RiskRuleResult] = {
    if (input.medicationAdherenceRate < 0.80) {
      Some(RiskRuleResult(
        "MEDICATION_ADHERENCE_RULE",
        15.0,
        s"Medication adherence is ${(input.medicationAdherenceRate * 100).toInt}% which is below the 80% compliance threshold (add 15 points)"
      ))
    } else None
  }
}
