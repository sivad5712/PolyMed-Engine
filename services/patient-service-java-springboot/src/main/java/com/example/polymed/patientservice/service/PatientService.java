package com.example.polymed.patientservice.service;

import com.example.polymed.patientservice.dto.CreatePatientRequest;
import com.example.polymed.patientservice.entity.Patient;
import com.example.polymed.patientservice.entity.MemberProfile;
import com.example.polymed.patientservice.entity.ClinicalSummary;
import com.example.polymed.patientservice.exception.ResourceNotFoundException;
import com.example.polymed.patientservice.repository.PatientRepository;
import com.example.polymed.patientservice.repository.MemberProfileRepository;
import com.example.polymed.patientservice.repository.ClinicalSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private MemberProfileRepository memberProfileRepository;

    @Autowired
    private ClinicalSummaryRepository clinicalSummaryRepository;

    public Patient createPatient(CreatePatientRequest req) {
        String patientId = "pat-" + UUID.randomUUID().toString().substring(0, 8);
        Patient patient = new Patient();
        patient.setPatientId(patientId);
        patient.setFirstName(req.getFirstName());
        patient.setLastName(req.getLastName());
        patient.setDateOfBirth(req.getDateOfBirth());
        patient.setGender(req.getGender());
        patient.setEmail(req.getEmail());
        patient.setPhone(req.getPhone());
        patient.setAddress(req.getAddress());
        patient.setSsnLastFour(req.getSsnLastFour());
        patient.setStatus("ACTIVE");

        Patient saved = patientRepository.save(patient);

        // Seed MemberProfile
        MemberProfile member = new MemberProfile();
        member.setMemberId("mem-" + UUID.randomUUID().toString().substring(0, 8));
        member.setPatientId(patientId);
        member.setInsuranceProvider("PolyShield Health");
        member.setPolicyNumber("POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        member.setGroupNumber("GRP-8812");
        member.setCoverageEffectiveDate("2026-06-01");
        member.setCoverageStatus("ACTIVE");
        member.setPlanType("PPO");
        memberProfileRepository.save(member);

        // Seed ClinicalSummary
        ClinicalSummary summary = new ClinicalSummary();
        summary.setPatientId(patientId);
        summary.setBloodType("O-Positive");
        summary.setAllergiesJson("[]");
        summary.setChronicConditionsJson("[]");
        summary.setActiveMedicationsJson("[]");
        summary.setBloodPressure("120/80");
        summary.setHeartRate(72);
        summary.setTemperature(98.6);
        summary.setBmi(24.5);
        clinicalSummaryRepository.save(summary);

        return saved;
    }

    public Patient getPatientById(String patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found: " + patientId));
    }

    public Patient updatePatientStatus(String patientId, String status) {
        Patient patient = getPatientById(patientId);
        patient.setStatus(status);
        return patientRepository.save(patient);
    }

    public MemberProfile getMemberByMemberId(String memberId) {
        return memberProfileRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member profile not found: " + memberId));
    }

    public ClinicalSummary getClinicalSummary(String patientId) {
        getPatientById(patientId); // throws if patient missing
        return clinicalSummaryRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Clinical summary missing for Patient: " + patientId));
    }
}
