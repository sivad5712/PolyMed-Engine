package com.example.polymed.patientservice.repository;

import com.example.polymed.patientservice.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProviderRepository extends JpaRepository<Provider, String> {
    List<Provider> findBySpecialtyIgnoreCase(String specialty);
}
