package com.example.polymed.patientservice.controller;

import com.example.polymed.patientservice.dto.*;
import com.example.polymed.patientservice.entity.Patient;
import com.example.polymed.patientservice.entity.MemberProfile;
import com.example.polymed.patientservice.entity.ClinicalSummary;
import com.example.polymed.patientservice.service.PatientService;
import com.example.polymed.patientservice.service.AuditService;
import com.example.polymed.patientservice.service.TechnologyTraceService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private AuditService auditService;

    @Autowired
    private TechnologyTraceService traceService;

    @PostMapping("/patients")
    @ResponseStatus(HttpStatus.CREATED)
    public StandardApiResponse<PatientResponse> createPatient(@RequestBody CreatePatientRequest request, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        Patient patient = patientService.createPatient(request);
        auditService.logAccess("CREATE_PATIENT", patient.getPatientId(), corrId);
        
        TechnologyTraceResponse trace = traceService.getTrace("CREATE_PATIENT", "/api/patients");
        return new StandardApiResponse<>("Patient profile registered successfully", new PatientResponse(patient), trace, corrId);
    }

    @GetMapping("/patients/{patientId}")
    public StandardApiResponse<PatientResponse> getPatient(@PathVariable String patientId, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        Patient patient = patientService.getPatientById(patientId);
        auditService.logAccess("READ_PATIENT_PROFILE", patientId, corrId);
        
        TechnologyTraceResponse trace = traceService.getTrace("GET_PATIENT", "/api/patients/" + patientId);
        return new StandardApiResponse<>("Patient profile retrieved successfully", new PatientResponse(patient), trace, corrId);
    }

    @PatchMapping("/patients/{patientId}/status")
    public StandardApiResponse<PatientResponse> updateStatus(
            @PathVariable String patientId, 
            @RequestBody UpdatePatientStatusRequest request, 
            HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        Patient patient = patientService.updatePatientStatus(patientId, request.getStatus());
        auditService.logAccess("UPDATE_PATIENT_STATUS", patientId, corrId);

        TechnologyTraceResponse trace = traceService.getTrace("UPDATE_PATIENT_STATUS", "/api/patients/" + patientId + "/status");
        return new StandardApiResponse<>("Patient status updated successfully", new PatientResponse(patient), trace, corrId);
    }

    @GetMapping("/patients/{patientId}/clinical-summary")
    public StandardApiResponse<ClinicalSummaryResponse> getClinicalSummary(@PathVariable String patientId, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        ClinicalSummary summary = patientService.getClinicalSummary(patientId);
        auditService.logAccess("READ_CLINICAL_SUMMARY", patientId, corrId);

        TechnologyTraceResponse trace = traceService.getTrace("READ_CLINICAL_SUMMARY", "/api/patients/" + patientId + "/clinical-summary");
        return new StandardApiResponse<>("Clinical summary retrieved successfully", new ClinicalSummaryResponse(summary), trace, corrId);
    }

    @GetMapping("/members/{memberId}")
    public StandardApiResponse<MemberProfile> getMember(@PathVariable String memberId, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        MemberProfile profile = patientService.getMemberByMemberId(memberId);
        auditService.logAccess("READ_MEMBER_PROFILE", profile.getPatientId(), corrId);

        TechnologyTraceResponse trace = traceService.getTrace("READ_MEMBER_PROFILE", "/api/members/" + memberId);
        return new StandardApiResponse<>("Member profile retrieved successfully", profile, trace, corrId);
    }

    private String getCorrelationId(HttpServletRequest request) {
        String val = request.getHeader("X-Correlation-ID");
        return val != null ? val : "corr-unknown";
    }
}
