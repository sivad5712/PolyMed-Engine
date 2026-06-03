package com.example.polymed.riskservice

import com.example.polymed.riskservice.models.PatientRiskInput
import com.example.polymed.riskservice.services.{RiskScoringService, TechnologyTraceService}

object Main {
  def main(args: Array[String]): Unit = {
    println("=============================================================")
    println("  PolyMed Engine - Clinical Risk Scoring Service (Scala)")
    println("  Paradigm: Pure Functional Rule Adjudication Pipeline")
    println("=============================================================")

    // Sample Patients with age and recentEmergencyVisits
    val lowRiskInput = PatientRiskInput(
      patientId = "pat-22910",
      chronicConditionsCount = 0,
      recentHospitalizations = 0,
      medicationAdherenceRate = 0.95,
      claimsUtilizationCount = 2,
      openCareGapsCount = 0,
      systolicBP = 118,
      diastolicBP = 78,
      fastingBloodSugar = 90,
      age = 42,
      recentEmergencyVisits = 0
    )

    val medRiskInput = PatientRiskInput(
      patientId = "pat-55412",
      chronicConditionsCount = 2,
      recentHospitalizations = 0,
      medicationAdherenceRate = 0.82,
      claimsUtilizationCount = 8,
      openCareGapsCount = 1,
      systolicBP = 138,
      diastolicBP = 88,
      fastingBloodSugar = 115,
      age = 67, // Triggers AgeRiskRule (+10 pts)
      recentEmergencyVisits = 0
    )

    val highRiskInput = PatientRiskInput(
      patientId = "pat-88291",
      chronicConditionsCount = 4,
      recentHospitalizations = 2,
      medicationAdherenceRate = 0.65,
      claimsUtilizationCount = 24,
      openCareGapsCount = 3,
      systolicBP = 165,
      diastolicBP = 102,
      fastingBloodSugar = 180,
      age = 72, // Triggers AgeRiskRule (+10 pts)
      recentEmergencyVisits = 1 // Triggers EmergencyVisitRule (+12 pts)
    )

    val testCases = List(
      ("LOW RISK CASE", lowRiskInput),
      ("MEDIUM RISK CASE", medRiskInput),
      ("HIGH RISK CASE", highRiskInput)
    )

    testCases.foreach { case (label, input) =>
      println(s"\n>>> Running evaluation: $label")
      println(s"    Patient ID: ${input.patientId} | Age: ${input.age}")
      println(s"    Vitals: BP ${input.systolicBP}/${input.diastolicBP}, Blood Sugar: ${input.fastingBloodSugar} mg/dL")
      println(s"    Meds Adherence: ${(input.medicationAdherenceRate * 100).toInt}%")

      val decision = RiskScoringService.evaluate(input)

      println(s"    Calculated Score: ${decision.calculatedScore} / 100.0")
      println(s"    Resulting Tier:   [${decision.riskCategory}]")
      println(s"    Explanation:      ${decision.explanation}")
      println("    Triggered Rules:")
      if (decision.ruleResults.isEmpty) {
        println("      - No rules triggered (Zero points)")
      } else {
        decision.ruleResults.foreach { rule =>
          println(s"      - ${rule.ruleName}: +${rule.pointsAdded} pts (${rule.message})")
        }
      }
    }

    println("\n>>> Technology Trace output example:")
    val trace = TechnologyTraceService.getTrace("/api/risk/score")
    println(s"    Action: ${trace.action}")
    println(s"    Service: ${trace.service}")
    println(s"    Technology Stack: ${trace.technologyStack.mkString(", ")}")
    println(s"    Why this stack: ${trace.whyThisStack}")

    println("\n=============================================================")
    println("  Evaluation Pipeline Complete.")
    println("=============================================================")
  }
}
