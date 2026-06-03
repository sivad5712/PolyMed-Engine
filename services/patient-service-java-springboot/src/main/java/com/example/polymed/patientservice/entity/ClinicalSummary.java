package com.example.polymed.patientservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "clinical_summaries")
public class ClinicalSummary {

    @Id
    private String patientId;

    private String bloodType;
    
    // Simplification for representation. In production we would map these as elements or child relationships.
    @Column(length = 2048)
    private String allergiesJson; // JSON list representing allergies
    
    @Column(length = 2048)
    private String chronicConditionsJson; // JSON list representing chronic conditions
    
    @Column(length = 2048)
    private String activeMedicationsJson; // JSON list representing active medications

    private String bloodPressure;
    private int heartRate;
    private double temperature;
    private double bmi;

    public ClinicalSummary() {}

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
