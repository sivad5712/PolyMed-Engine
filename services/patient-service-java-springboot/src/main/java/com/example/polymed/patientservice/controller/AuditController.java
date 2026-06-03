package com.example.polymed.patientservice.controller;

import com.example.polymed.patientservice.dto.*;
import com.example.polymed.patientservice.entity.AuditRecord;
import com.example.polymed.patientservice.service.AuditService;
import com.example.polymed.patientservice.service.TechnologyTraceService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AuditController {

    @Autowired
    private AuditService auditService;

    @Autowired
    private TechnologyTraceService traceService;

    @GetMapping("/audit-records")
    public StandardApiResponse<List<AuditRecordResponse>> getAuditLogs(HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        List<AuditRecord> logs = auditService.getAllAuditRecords();
        List<AuditRecordResponse> data = logs.stream().map(AuditRecordResponse::new).collect(Collectors.toList());

        TechnologyTraceResponse trace = traceService.getTrace("READ_AUDITS", "/api/audit-records");
        return new StandardApiResponse<>("Audit logs retrieved successfully", data, trace, corrId);
    }

    private String getCorrelationId(HttpServletRequest request) {
        String val = request.getHeader("X-Correlation-ID");
        return val != null ? val : "corr-unknown";
    }
}
