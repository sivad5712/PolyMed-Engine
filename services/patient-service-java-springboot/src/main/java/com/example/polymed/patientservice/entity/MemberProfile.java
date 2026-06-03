package com.example.polymed.patientservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "member_profiles")
public class MemberProfile {

    @Id
    private String memberId;

    private String patientId;
    private String insuranceProvider;
    private String policyNumber;
    private String groupNumber;
    private String coverageEffectiveDate;
    private String coverageStatus;
    private String planType;

    public MemberProfile() {}

    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }
    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }
    public String getInsuranceProvider() { return insuranceProvider; }
    public void setInsuranceProvider(String insuranceProvider) { this.insuranceProvider = insuranceProvider; }
    public String getPolicyNumber() { return policyNumber; }
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }
    public String getGroupNumber() { return groupNumber; }
    public void setGroupNumber(String groupNumber) { this.groupNumber = groupNumber; }
    public String getCoverageEffectiveDate() { return coverageEffectiveDate; }
    public void setCoverageEffectiveDate(String coverageEffectiveDate) { this.coverageEffectiveDate = coverageEffectiveDate; }
    public String getCoverageStatus() { return coverageStatus; }
    public void setCoverageStatus(String coverageStatus) { this.coverageStatus = coverageStatus; }
    public String getPlanType() { return planType; }
    public void setPlanType(String planType) { this.planType = planType; }
}
