package com.example.polymed.patientservice.service;

import com.example.polymed.patientservice.entity.AuditRecord;
import com.example.polymed.patientservice.repository.AuditRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditService {

    @Autowired
    private AuditRecordRepository auditRecordRepository;

    public void logAccess(String action, String resourceId, String correlationId) {
        String username = SecurityContextHolder.getContext().getAuthentication() != null 
                ? SecurityContextHolder.getContext().getAuthentication().getName() 
                : "SYSTEM";
        
        String role = SecurityContextHolder.getContext().getAuthentication() != null 
                ? SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString() 
                : "NONE";

        AuditRecord record = new AuditRecord(username, role, action, resourceId, correlationId);
        auditRecordRepository.save(record);
    }

    public List<AuditRecord> getAllAuditRecords() {
        return auditRecordRepository.findAll();
    }
}
