package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

trait RiskRule {
  def evaluate(input: PatientRiskInput): Option[RiskRuleResult]
}
