package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

object EmergencyVisitRule extends RiskRule {
  override def evaluate(input: PatientRiskInput): Option[RiskRuleResult] = {
    if (input.recentEmergencyVisits > 0) {
      Some(RiskRuleResult(
        "EMERGENCY_VISIT_RULE",
        12.0,
        s"Patient had ${input.recentEmergencyVisits} emergency visits (threshold: 1+ adds 12 points)"
      ))
    } else None
  }
}
