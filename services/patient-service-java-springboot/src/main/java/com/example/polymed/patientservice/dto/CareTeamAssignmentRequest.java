package com.example.polymed.patientservice.dto;

import java.util.List;

public class CareTeamAssignmentRequest {
    private String patientId;
    private List<String> providerIds;
    private String assignedRole;
    private String startDate;

    public CareTeamAssignmentRequest() {}

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }
    public List<String> getProviderIds() { return providerIds; }
    public void setProviderIds(List<String> providerIds) { this.providerIds = providerIds; }
    public String getAssignedRole() { return assignedRole; }
    public void setAssignedRole(String assignedRole) { this.assignedRole = assignedRole; }
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
}
