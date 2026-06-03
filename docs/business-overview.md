# Healthcare Business Domains Overview

This document provides clinical and operational context for the healthcare domains implemented in the **PolyMed Engine**.

## 1. Patient & Member Management
Managing patient identities, demographics, and contact information is crucial for care delivery. We differentiate between **Patients** (individuals receiving clinical care) and **Members** (individuals enrolled in specific health insurance plans). Accurate identity mapping is vital to prevent medical errors and ensure correct billing.

## 2. Provider Management
Tracks credentialed clinical practitioners, their National Provider Identifier (NPI), specialties, and affiliated clinical facilities. Linking patients to primary care providers is essential for establishing care accountability.

## 3. Clinical Risk Scoring
A proactive management technique where patient health indicators (chronic conditions, recent hospitalizations, medication compliance, and vitals) are analyzed to calculate an aggregate risk score (0-100). High-risk individuals are routed to dedicated care managers to prevent emergency readmissions.

## 4. Claims Workflow
Adjudicating claims involves verifying that a provider's medical service for a member matches their insurance plan's coverage rules. The claim lifecycle (Submitted, Under Review, Approved, or Denied) requires rigorous audit trails for compliance with HIPAA.

## 5. Care Gap Tracking
Care gaps represent discrepancies between evidence-based guidelines and the actual care received by a patient (e.g., missing an annual diabetic A1C test or cancer screening). Tracking and resolving these gaps is a primary driver of quality improvement (HEDIS metrics).

## 6. Healthcare Analytics
Executive dashboards compile metrics (like compliance rates, claim denial patterns, provider workloads, and high-risk cohort sizes) to assist clinical executives in optimizing resource allocation and predicting cost trends.

## 7. Notifications
Automated communications to patients (reminders of upcoming visits, open care gaps) and care teams (notifications of a patient's risk category escalation) are essential to improve patient engagement and coordinate care.
