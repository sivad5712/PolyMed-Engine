package com.example.polymed.patientservice.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "care_teams")
public class CareTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientId;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "care_team_providers", joinColumns = @JoinColumn(name = "care_team_id"))
    @Column(name = "provider_id")
    private List<String> providerIds;

    private String assignedRole; // PRIMARY_CARE, SPECIALTY_CARE
    private String startDate;
    private String status = "ACTIVE"; // ACTIVE, INACTIVE

    public CareTeam() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

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
}
