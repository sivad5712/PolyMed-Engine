package com.example.polymed.patientservice.controller;

import com.example.polymed.patientservice.dto.*;
import com.example.polymed.patientservice.entity.CareTeam;
import com.example.polymed.patientservice.service.CareTeamService;
import com.example.polymed.patientservice.service.AuditService;
import com.example.polymed.patientservice.service.TechnologyTraceService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CareTeamController {

    @Autowired
    private CareTeamService careTeamService;

    @Autowired
    private AuditService auditService;

    @Autowired
    private TechnologyTraceService traceService;

    @PostMapping("/care-teams")
    public StandardApiResponse<CareTeamResponse> assignCareTeam(@RequestBody CreateCareTeamRequest request, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        CareTeam careTeam = careTeamService.assignCareTeam(request);
        auditService.logAccess("ASSIGN_CARE_TEAM", careTeam.getPatientId(), corrId);
        
        TechnologyTraceResponse trace = traceService.getTrace("ASSIGN_CARE_TEAM", "/api/care-teams");
        return new StandardApiResponse<>("Care team assigned successfully", new CareTeamResponse(careTeam), trace, corrId);
    }

    @GetMapping("/care-teams/patient/{patientId}")
    public StandardApiResponse<CareTeamResponse> getCareTeam(@PathVariable String patientId, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        CareTeam careTeam = careTeamService.getCareTeamByPatientId(patientId);
        auditService.logAccess("READ_CARE_TEAM", patientId, corrId);
        
        TechnologyTraceResponse trace = traceService.getTrace("READ_CARE_TEAM", "/api/care-teams/patient/" + patientId);
        return new StandardApiResponse<>("Care team details retrieved successfully", new CareTeamResponse(careTeam), trace, corrId);
    }

    @PatchMapping("/care-teams/{careTeamId}/status")
    public StandardApiResponse<CareTeamResponse> updateStatus(
            @PathVariable Long careTeamId, 
            @RequestBody UpdatePatientStatusRequest request, 
            HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        CareTeam careTeam = careTeamService.updateCareTeamStatus(careTeamId, request.getStatus());
        auditService.logAccess("UPDATE_CARE_TEAM_STATUS", careTeam.getPatientId(), corrId);

        TechnologyTraceResponse trace = traceService.getTrace("UPDATE_CARE_TEAM_STATUS", "/api/care-teams/" + careTeamId + "/status");
        return new StandardApiResponse<>("Care team status updated successfully", new CareTeamResponse(careTeam), trace, corrId);
    }

    private String getCorrelationId(HttpServletRequest request) {
        String val = request.getHeader("X-Correlation-ID");
        return val != null ? val : "corr-unknown";
    }
}
