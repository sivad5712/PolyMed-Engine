package com.example.polymed.patientservice.service;

import com.example.polymed.patientservice.dto.TechnologyTraceResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnologyTraceService {

    public TechnologyTraceResponse getTrace(String action, String requestPath) {
        return new TechnologyTraceResponse(
                action,
                "Patient Management Service",
                "patient-service-java-springboot",
                List.of("Java", "Spring Boot", "Spring MVC", "Spring Security", "Hibernate"),
                "Patient and Member Management",
                "This stack is used for structured enterprise healthcare APIs, role-based access, layered service design, and entity modeling.",
                requestPath,
                "Domain service responsible for managing patient demographic and care team configurations."
        );
    }
}
