package com.example.polymed.patientservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "care_gaps")
public class CareGap {

    @Id
    private String gapId;

    private String patientId;
    private String measureCode; // A1C-TEST, COLON-SCREEN
    private String measureName;
    private String status; // OPEN, CLOSED
    private String dueDate;
    private String assignedProviderId;
    private String closedDate;
    private String closureReason;
    private String evidenceReference;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public CareGap() {}

    public String getGapId() { return gapId; }
    public void setGapId(String gapId) { this.gapId = gapId; }
    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }
    public String getMeasureCode() { return measureCode; }
    public void setMeasureCode(String measureCode) { this.measureCode = measureCode; }
    public String getMeasureName() { return measureName; }
    public void setMeasureName(String measureName) { this.measureName = measureName; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }
    public String getAssignedProviderId() { return assignedProviderId; }
    public void setAssignedProviderId(String assignedProviderId) { this.assignedProviderId = assignedProviderId; }
    public String getClosedDate() { return closedDate; }
    public void setClosedDate(String closedDate) { this.closedDate = closedDate; }
    public String getClosureReason() { return closureReason; }
    public void setClosureReason(String closureReason) { this.closureReason = closureReason; }
    public String getEvidenceReference() { return evidenceReference; }
    public void setEvidenceReference(String evidenceReference) { this.evidenceReference = evidenceReference; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
