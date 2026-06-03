package com.example.polymed.patientservice.dto;

import com.example.polymed.patientservice.entity.CareTeam;
import java.util.List;

public class CareTeamResponse {
    private Long id;
    private String patientId;
    private List<String> providerIds;
    private String assignedRole;
    private String startDate;
    private String status;

    public CareTeamResponse() {}

    public CareTeamResponse(CareTeam ct) {
        this.id = ct.getId();
        this.patientId = ct.getPatientId();
        this.providerIds = ct.getProviderIds();
        this.assignedRole = ct.getAssignedRole();
        this.startDate = ct.getStartDate();
        this.status = ct.getStatus();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }
    public List<String> getProviderIds() { return providerIds; }
    public void setProviderIds(List<String> providerIds) { this.providerIds = providerIds; }
    public String getAssignedRole() { return assignedRole; }
    public void setAssignedRole(String assignedRole) { this.assignedRole = assignedRole; }
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
