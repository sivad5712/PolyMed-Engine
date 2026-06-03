package com.example.polymed.riskservice.models

case class PatientRiskInput(
  patientId: String,
  chronicConditionsCount: Int,
  recentHospitalizations: Int,
  medicationAdherenceRate: Double,
  claimsUtilizationCount: Int,
  openCareGapsCount: Int,
  systolicBP: Int,
  diastolicBP: Int,
  fastingBloodSugar: Int,
  age: Int,
  recentEmergencyVisits: Int
)

case class RiskRuleResult(
  ruleName: String,
  pointsAdded: Double,
  message: String
)

case class RiskDecision(
  patientId: String,
  calculatedScore: Double,
  riskCategory: String,
  evaluationTimestamp: String,
  ruleResults: List[RiskRuleResult],
  explanation: String
)

case class TechnologyTrace(
  action: String,
  service: String,
  module: String,
  technologyStack: List[String],
  businessDomain: String,
  whyThisStack: String,
  requestPath: String,
  architectureRole: String
)
