package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

object AgeRiskRule extends RiskRule {
  override def evaluate(input: PatientRiskInput): Option[RiskRuleResult] = {
    if (input.age > 65) {
      Some(RiskRuleResult(
        "AGE_RISK_RULE",
        10.0,
        s"Patient age is ${input.age} (threshold: 65+ adds 10 points)"
      ))
    } else None
  }
}
