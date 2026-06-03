package com.example.polymed.patientservice.dto;

import com.example.polymed.patientservice.entity.AuditRecord;
import java.time.LocalDateTime;

public class AuditRecordResponse {
    private Long id;
    private String username;
    private String userRole;
    private String action;
    private String resourceId;
    private String correlationId;
    private LocalDateTime timestamp;

    public AuditRecordResponse() {}

    public AuditRecordResponse(AuditRecord r) {
        this.id = r.getId();
        this.username = r.getUsername();
        this.userRole = r.getUserRole();
        this.action = r.getAction();
        this.resourceId = r.getResourceId();
        this.correlationId = r.getCorrelationId();
        this.timestamp = r.getTimestamp();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getResourceId() { return resourceId; }
    public void setResourceId(String resourceId) { this.resourceId = resourceId; }
    public String getCorrelationId() { return correlationId; }
    public void setCorrelationId(String correlationId) { this.correlationId = correlationId; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
