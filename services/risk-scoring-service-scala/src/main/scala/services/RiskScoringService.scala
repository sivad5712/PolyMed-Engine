package com.example.polymed.riskservice.services

import com.example.polymed.riskservice.models.{PatientRiskInput, RiskDecision, RiskRuleResult}
import com.example.polymed.riskservice.rules._
import java.time.Instant

object RiskScoringService {

  private val rules: List[RiskRule] = List(
    ChronicConditionRule,
    HospitalizationRule,
    MedicationAdherenceRule,
    ClaimsUtilizationRule,
    CareGapRule,
    ObservationRule,
    AgeRiskRule,
    EmergencyVisitRule
  )

  def evaluate(input: PatientRiskInput): RiskDecision = {
    // Run rule evaluation pipeline using standard functional mapping
    val ruleResults: List[RiskRuleResult] = rules.flatMap(_.evaluate(input))
    
    // Sum points, capping at 100.0
    val rawScore = ruleResults.map(_.pointsAdded).sum
    val calculatedScore = Math.min(rawScore, 100.0)

    // Determine category
    val riskCategory = if (calculatedScore > 70.0) {
      "HIGH_RISK"
    } else if (calculatedScore > 30.0) {
      "MEDIUM_RISK"
    } else {
      "LOW_RISK"
    }

    // Generate clinical explanation
    val explanation = riskCategory match {
      case "HIGH_RISK" => 
        "Critical clinical status: Multiple chronic conditions, recent hospitalizations, poor medication adherence, and uncontrolled vitals place this patient in the High Risk tier, requiring immediate Care Management intervention."
      case "MEDIUM_RISK" => 
        "Moderate clinical status: Patient has mild risk factors such as minor medication non-compliance or a chronic condition. Clinical monitoring and care coordinator follow-up are recommended."
      case "LOW_RISK" => 
        "Stable clinical status: Vitals and history suggest low risk. Continue standard preventive care tracking."
    }

    RiskDecision(
      patientId = input.patientId,
      calculatedScore = calculatedScore,
      riskCategory = riskCategory,
      evaluationTimestamp = Instant.now().toString,
      ruleResults = ruleResults,
      explanation = explanation
    )
  }
}
