package com.example.polymed.patientservice.service;

import com.example.polymed.patientservice.dto.CreateCareTeamRequest;
import com.example.polymed.patientservice.entity.CareTeam;
import com.example.polymed.patientservice.exception.ResourceNotFoundException;
import com.example.polymed.patientservice.repository.CareTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CareTeamService {

    @Autowired
    private CareTeamRepository careTeamRepository;

    public CareTeam assignCareTeam(CreateCareTeamRequest req) {
        Optional<CareTeam> existing = careTeamRepository.findByPatientId(req.getPatientId());
        CareTeam careTeam = existing.orElseGet(CareTeam::new);
        
        careTeam.setPatientId(req.getPatientId());
        careTeam.setProviderIds(req.getProviderIds());
        careTeam.setAssignedRole(req.getAssignedRole());
        careTeam.setStartDate(req.getStartDate());
        careTeam.setStatus("ACTIVE");

        return careTeamRepository.save(careTeam);
    }

    public CareTeam getCareTeamByPatientId(String patientId) {
        return careTeamRepository.findByPatientId(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("No Care Team assigned to Patient: " + patientId));
    }

    public CareTeam updateCareTeamStatus(Long id, String status) {
        CareTeam careTeam = careTeamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Care team not found: " + id));
        careTeam.setStatus(status);
        return careTeamRepository.save(careTeam);
    }
}
