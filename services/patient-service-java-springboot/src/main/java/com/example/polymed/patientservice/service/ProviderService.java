package com.example.polymed.patientservice.service;

import com.example.polymed.patientservice.dto.CreateProviderRequest;
import com.example.polymed.patientservice.entity.Provider;
import com.example.polymed.patientservice.exception.ResourceNotFoundException;
import com.example.polymed.patientservice.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    public Provider createProvider(CreateProviderRequest req) {
        String providerId = "prov-" + UUID.randomUUID().toString().substring(0, 5);
        Provider provider = new Provider();
        provider.setProviderId(providerId);
        provider.setNpi(req.getNpi());
        provider.setFirstName(req.getFirstName());
        provider.setLastName(req.getLastName());
        provider.setSpecialty(req.getSpecialty());
        provider.setEmail(req.getEmail());
        provider.setPhone(req.getPhone());
        provider.setFacility(req.getFacility());
        provider.setStatus("ACTIVE");

        return providerRepository.save(provider);
    }

    public Provider getProviderById(String providerId) {
        return providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider not found: " + providerId));
    }

    public List<Provider> getProvidersBySpecialty(String specialty) {
        return providerRepository.findBySpecialtyIgnoreCase(specialty);
    }

    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }
}
