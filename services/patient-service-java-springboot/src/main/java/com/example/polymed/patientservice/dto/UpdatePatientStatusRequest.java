package com.example.polymed.patientservice.dto;

public class UpdatePatientStatusRequest {
    private String status;

    public UpdatePatientStatusRequest() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
