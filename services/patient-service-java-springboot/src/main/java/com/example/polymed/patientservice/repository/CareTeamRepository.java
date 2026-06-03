package com.example.polymed.patientservice.repository;

import com.example.polymed.patientservice.entity.CareTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CareTeamRepository extends JpaRepository<CareTeam, Long> {
    Optional<CareTeam> findByPatientId(String patientId);
}
