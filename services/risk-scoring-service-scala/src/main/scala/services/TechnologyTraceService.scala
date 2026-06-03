package com.example.polymed.riskservice.services

import com.example.polymed.riskservice.models.TechnologyTrace

object TechnologyTraceService {
  def getTrace(requestPath: String): TechnologyTrace = {
    TechnologyTrace(
      action = "EVALUATE_RISK",
      service = "Clinical Risk Scoring Service",
      module = "risk-scoring-service-scala",
      technologyStack = List("Scala"),
      businessDomain = "Clinical Risk Scoring",
      whyThisStack = "Scala is used for clinical risk scoring because of its pure functional rule evaluation capabilities, type-safety, and side-effect-free math execution.",
      requestPath = requestPath,
      architectureRole = "Domain service responsible for executing clinical algorithms on patient metrics."
    )
  }
}
