package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

object ChronicConditionRule extends RiskRule {
  override def evaluate(input: PatientRiskInput): Option[RiskRuleResult] = {
    if (input.chronicConditionsCount >= 3) {
      Some(RiskRuleResult(
        "CHRONIC_CONDITION_COUNT_RULE",
        20.0,
        s"Patient has ${input.chronicConditionsCount} chronic conditions (threshold: 3+ add 20 points)"
      ))
    } else None
  }
}
