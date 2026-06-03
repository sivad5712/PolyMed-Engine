package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

object RecentHospitalizationRule extends RiskRule {
  override def evaluate(input: PatientRiskInput): Option[RiskRuleResult] = {
    if (input.recentHospitalizations > 0) {
      val points = Math.min(input.recentHospitalizations * 15.0, 30.0)
      Some(RiskRuleResult(
        "RECENT_HOSPITALIZATION_RULE",
        points,
        s"Patient has ${input.recentHospitalizations} hospitalizations within the last 12 months (threshold: 1+ add 15 points per hospitalization, max 30)"
      ))
    } else None
  }
}
