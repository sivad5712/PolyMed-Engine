package com.example.polymed.patientservice.controller;

import com.example.polymed.patientservice.dto.*;
import com.example.polymed.patientservice.entity.CareGap;
import com.example.polymed.patientservice.service.CareGapService;
import com.example.polymed.patientservice.service.AuditService;
import com.example.polymed.patientservice.service.TechnologyTraceService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class CareGapController {

    @Autowired
    private CareGapService careGapService;

    @Autowired
    private AuditService auditService;

    @Autowired
    private TechnologyTraceService traceService;

    @GetMapping("/care-gaps/patient/{patientId}")
    public StandardApiResponse<List<CareGapResponse>> getCareGaps(@PathVariable String patientId, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        List<CareGap> gaps = careGapService.getGapsByPatient(patientId);
        auditService.logAccess("READ_CARE_GAPS", patientId, corrId);

        List<CareGapResponse> data = gaps.stream().map(CareGapResponse::new).collect(Collectors.toList());
        TechnologyTraceResponse trace = traceService.getTrace("READ_CARE_GAPS", "/api/care-gaps/patient/" + patientId);
        return new StandardApiResponse<>("Care gaps list retrieved successfully", data, trace, corrId);
    }

    @PatchMapping("/care-gaps/{careGapId}/in-progress")
    public StandardApiResponse<CareGapResponse> markInProgress(@PathVariable String careGapId, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        CareGap gap = careGapService.updateToInProgress(careGapId);
        auditService.logAccess("UPDATE_CARE_GAP_IN_PROGRESS", careGapId, corrId);

        TechnologyTraceResponse trace = traceService.getTrace("UPDATE_CARE_GAP", "/api/care-gaps/" + careGapId + "/in-progress");
        return new StandardApiResponse<>("Care gap status updated to In Progress", new CareGapResponse(gap), trace, corrId);
    }

    @PatchMapping("/care-gaps/{careGapId}/close")
    public StandardApiResponse<CareGapResponse> closeGap(
            @PathVariable String careGapId, 
            @RequestBody Map<String, String> requestBody, 
            HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        String reason = requestBody.getOrDefault("closureReason", "Completed and verified.");
        String providerId = requestBody.getOrDefault("assignedProviderId", "prov-unknown");
        String reference = requestBody.getOrDefault("evidenceReference", "evidence-ref-auto");

        CareGap gap = careGapService.closeGap(careGapId, reason, providerId, reference);
        auditService.logAccess("CLOSE_CARE_GAP", careGapId, corrId);

        TechnologyTraceResponse trace = traceService.getTrace("CLOSE_CARE_GAP", "/api/care-gaps/" + careGapId + "/close");
        return new StandardApiResponse<>("Care gap closed successfully", new CareGapResponse(gap), trace, corrId);
    }

    private String getCorrelationId(HttpServletRequest request) {
        String val = request.getHeader("X-Correlation-ID");
        return val != null ? val : "corr-unknown";
    }
}
