package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

object ObservationRule extends RiskRule {
  override def evaluate(input: PatientRiskInput): Option[RiskRuleResult] = {
    var points = 0.0
    var messages = List.empty[String]

    if (input.systolicBP > 140 || input.diastolicBP > 90) {
      points += 5.0
      messages = s"Elevated blood pressure (${input.systolicBP}/${input.diastolicBP})" :: messages
    }

    if (input.fastingBloodSugar > 126) {
      points += 5.5
      messages = s"fasting blood sugar (${input.fastingBloodSugar} mg/dL)" :: messages
    }

    if (points > 0.0) {
      Some(RiskRuleResult(
        "ABNORMAL_OBSERVATION_RULE",
        points,
        s"Abnormal readings detected: ${messages.reverse.mkString(" and ")}"
      ))
    } else None
  }
}
