package com.example.polymed.patientservice.dto;

import com.example.polymed.patientservice.entity.CareGap;

public class CareGapResponse {
    private String gapId;
    private String patientId;
    private String measureCode;
    private String measureName;
    private String status;
    private String dueDate;
    private String assignedProviderId;
    private String closedDate;
    private String closureReason;
    private String evidenceReference;

    public CareGapResponse() {}

    public CareGapResponse(CareGap cg) {
        this.gapId = cg.getGapId();
        this.patientId = cg.getPatientId();
        this.measureCode = cg.getMeasureCode();
        this.measureName = cg.getMeasureName();
        this.status = cg.getStatus();
        this.dueDate = cg.getDueDate();
        this.assignedProviderId = cg.getAssignedProviderId();
        this.closedDate = cg.getClosedDate();
        this.closureReason = cg.getClosureReason();
        this.evidenceReference = cg.getEvidenceReference();
    }

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
}
