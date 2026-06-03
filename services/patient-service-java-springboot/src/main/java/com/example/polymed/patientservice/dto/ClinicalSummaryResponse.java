package com.example.polymed.patientservice.dto;

import com.example.polymed.patientservice.entity.ClinicalSummary;

public class ClinicalSummaryResponse {
    private String patientId;
    private String bloodType;
    private String allergiesJson;
    private String chronicConditionsJson;
    private String activeMedicationsJson;
    private String bloodPressure;
    private int heartRate;
    private double temperature;
    private double bmi;

    public ClinicalSummaryResponse() {}

    public ClinicalSummaryResponse(ClinicalSummary summary) {
        this.patientId = summary.getPatientId();
        this.bloodType = summary.getBloodType();
        this.allergiesJson = summary.getAllergiesJson();
        this.chronicConditionsJson = summary.getChronicConditionsJson();
        this.activeMedicationsJson = summary.getActiveMedicationsJson();
        this.bloodPressure = summary.getBloodPressure();
        this.heartRate = summary.getHeartRate();
        this.temperature = summary.getTemperature();
        this.bmi = summary.getBmi();
    }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }
    public String getBloodType() { return bloodType; }
    public void setBloodType(String bloodType) { this.bloodType = bloodType; }
    public String getAllergiesJson() { return allergiesJson; }
    public void setAllergiesJson(String allergiesJson) { this.allergiesJson = allergiesJson; }
    public String getChronicConditionsJson() { return chronicConditionsJson; }
    public void setChronicConditionsJson(String chronicConditionsJson) { this.chronicConditionsJson = chronicConditionsJson; }
    public String getActiveMedicationsJson() { return activeMedicationsJson; }
    public void setActiveMedicationsJson(String activeMedicationsJson) { this.activeMedicationsJson = activeMedicationsJson; }
    public String getBloodPressure() { return bloodPressure; }
    public void setBloodPressure(String bloodPressure) { this.bloodPressure = bloodPressure; }
    public int getHeartRate() { return heartRate; }
    public void setHeartRate(int heartRate) { this.heartRate = heartRate; }
    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }
    public double getBmi() { return bmi; }
    public void setBmi(double bmi) { this.bmi = bmi; }
}
