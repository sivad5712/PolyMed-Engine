package com.example.polymed.patientservice.service;

import com.example.polymed.patientservice.entity.CareGap;
import com.example.polymed.patientservice.exception.ResourceNotFoundException;
import com.example.polymed.patientservice.repository.CareGapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CareGapService {

    @Autowired
    private CareGapRepository careGapRepository;

    public List<CareGap> getGapsByPatient(String patientId) {
        return careGapRepository.findByPatientId(patientId);
    }

    public CareGap updateToInProgress(String gapId) {
        CareGap gap = careGapRepository.findById(gapId)
                .orElseThrow(() -> new ResourceNotFoundException("Care gap not found: " + gapId));
        gap.setStatus("IN_PROGRESS");
        return careGapRepository.save(gap);
    }

    public CareGap closeGap(String gapId, String reason, String providerId, String reference) {
        CareGap gap = careGapRepository.findById(gapId)
                .orElseThrow(() -> new ResourceNotFoundException("Care gap not found: " + gapId));
        gap.setStatus("CLOSED");
        gap.setClosureReason(reason);
        gap.setAssignedProviderId(providerId);
        gap.setEvidenceReference(reference);
        gap.setClosedDate(LocalDate.now().toString());
        return careGapRepository.save(gap);
    }
}
