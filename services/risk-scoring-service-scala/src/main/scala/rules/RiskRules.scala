package com.example.polymed.riskservice.rules

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskRuleResult}

trait RiskRule {
  def evaluate(input: PatientRiskInput): Option[RiskRuleResult]
}

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

object HospitalizationRule extends RiskRule {
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

object OpenCareGapRule extends RiskRule {
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

object AbnormalObservationRule extends RiskRule {
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
