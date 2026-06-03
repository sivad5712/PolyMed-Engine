package com.example.polymed.patientservice.repository;

import com.example.polymed.patientservice.entity.ClinicalSummary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicalSummaryRepository extends JpaRepository<ClinicalSummary, String> {
}
