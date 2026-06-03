package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

object CareGapRule extends RiskRule {
  override def evaluate(input: PatientRiskInput): Option[RiskRuleResult] = {
    if (input.openCareGapsCount > 0) {
      Some(RiskRuleResult(
        "OPEN_CARE_GAP_RULE",
        5.0,
        s"Patient has ${input.openCareGapsCount} open care gaps (add 5 points for any open care gaps)"
      ))
    } else None
  }
}
