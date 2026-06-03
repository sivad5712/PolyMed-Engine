package com.example.polymed.patientservice.repository;

import com.example.polymed.patientservice.entity.CareGap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CareGapRepository extends JpaRepository<CareGap, String> {
    List<CareGap> findByPatientId(String patientId);
}
