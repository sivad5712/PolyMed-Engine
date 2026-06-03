package com.example.polymed.patientservice.repository;

import com.example.polymed.patientservice.entity.AuditRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditRecordRepository extends JpaRepository<AuditRecord, Long> {
}
