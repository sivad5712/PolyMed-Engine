package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

object ClaimsUtilizationRule extends RiskRule {
  override def evaluate(input: PatientRiskInput): Option[RiskRuleResult] = {
    if (input.claimsUtilizationCount >= 20) {
      Some(RiskRuleResult(
        "CLAIMS_UTILIZATION_RULE",
        10.0,
        s"High claims utilization of ${input.claimsUtilizationCount} (threshold: 20+ add 10 points)"
      ))
    } else None
  }
}
