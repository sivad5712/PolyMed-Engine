package com.example.polymed.patientservice.controller;

import com.example.polymed.patientservice.dto.*;
import com.example.polymed.patientservice.entity.Provider;
import com.example.polymed.patientservice.service.ProviderService;
import com.example.polymed.patientservice.service.AuditService;
import com.example.polymed.patientservice.service.TechnologyTraceService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @Autowired
    private AuditService auditService;

    @Autowired
    private TechnologyTraceService traceService;

    @PostMapping("/providers")
    @ResponseStatus(HttpStatus.CREATED)
    public StandardApiResponse<ProviderResponse> createProvider(@RequestBody CreateProviderRequest request, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        Provider provider = providerService.createProvider(request);
        auditService.logAccess("CREATE_PROVIDER", provider.getProviderId(), corrId);
        
        TechnologyTraceResponse trace = traceService.getTrace("CREATE_PROVIDER", "/api/providers");
        return new StandardApiResponse<>("Provider profile registered successfully", new ProviderResponse(provider), trace, corrId);
    }

    @GetMapping("/providers/{providerId}")
    public StandardApiResponse<ProviderResponse> getProvider(@PathVariable String providerId, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        Provider provider = providerService.getProviderById(providerId);
        auditService.logAccess("READ_PROVIDER_PROFILE", providerId, corrId);
        
        TechnologyTraceResponse trace = traceService.getTrace("GET_PROVIDER", "/api/providers/" + providerId);
        return new StandardApiResponse<>("Provider profile retrieved successfully", new ProviderResponse(provider), trace, corrId);
    }

    @GetMapping("/providers/specialty/{specialty}")
    public StandardApiResponse<List<ProviderResponse>> getProvidersBySpecialty(@PathVariable String specialty, HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        List<Provider> providers = providerService.getProvidersBySpecialty(specialty);
        auditService.logAccess("READ_PROVIDERS_BY_SPECIALTY", specialty, corrId);
        
        List<ProviderResponse> data = providers.stream().map(ProviderResponse::new).collect(Collectors.toList());
        TechnologyTraceResponse trace = traceService.getTrace("READ_PROVIDERS_BY_SPECIALTY", "/api/providers/specialty/" + specialty);
        return new StandardApiResponse<>("Providers matching specialty retrieved successfully", data, trace, corrId);
    }

    @GetMapping("/providers")
    public StandardApiResponse<List<ProviderResponse>> getProviders(HttpServletRequest servletRequest) {
        String corrId = getCorrelationId(servletRequest);
        List<Provider> providers = providerService.getAllProviders();
        auditService.logAccess("READ_PROVIDERS_LIST", "all", corrId);

        List<ProviderResponse> data = providers.stream().map(ProviderResponse::new).collect(Collectors.toList());
        TechnologyTraceResponse trace = traceService.getTrace("READ_PROVIDERS_LIST", "/api/providers");
        return new StandardApiResponse<>("All providers list retrieved successfully", data, trace, corrId);
    }

    private String getCorrelationId(HttpServletRequest request) {
        String val = request.getHeader("X-Correlation-ID");
        return val != null ? val : "corr-unknown";
    }
}
