package com.example.polymed.patientservice.repository;

import com.example.polymed.patientservice.entity.MemberProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberProfileRepository extends JpaRepository<MemberProfile, String> {
    Optional<MemberProfile> findByPatientId(String patientId);
}
