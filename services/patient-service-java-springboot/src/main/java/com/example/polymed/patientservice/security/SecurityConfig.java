package com.example.polymed.patientservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Health Check
                .requestPathMatchers(request -> request.getRequestURI().equals("/health")).permitAll()
                .requestPathMatchers(request -> request.getRequestURI().equals("/h2-console") || request.getRequestURI().startsWith("/h2-console/")).permitAll()
                
                // Endpoints configuration
                .requestMatchers("/audit-records").hasRole("AUDITOR")
                
                .requestMatchers("/clinical-summary/**").hasAnyRole("ADMIN", "CLINICIAN")
                
                .requestMatchers("/care-teams/patient/**").hasAnyRole("ADMIN", "CLINICIAN", "CARE_MANAGER")
                .requestMatchers("/care-teams").hasAnyRole("ADMIN", "CARE_MANAGER")
                
                .requestMatchers("/care-gaps/patient/**").hasAnyRole("ADMIN", "CLINICIAN", "CARE_MANAGER")
                
                .requestMatchers("/patients/member/**").hasAnyRole("ADMIN", "CLINICIAN", "CARE_MANAGER", "CLAIMS_REVIEWER")
                .requestMatchers("/patients/**").hasAnyRole("ADMIN", "CLINICIAN", "CARE_MANAGER", "CLAIMS_REVIEWER")
                .requestMatchers("/patients").hasRole("ADMIN")
                
                .requestMatchers("/providers/**").hasAnyRole("ADMIN", "CLINICIAN", "CARE_MANAGER", "CLAIMS_REVIEWER")
                .requestMatchers("/providers").hasRole("ADMIN")
                
                .anyRequest().authenticated()
            )
            .headers(headers -> headers.frameOptions(frame -> frame.disable())) // For H2 console access
            .addFilterBefore(new RoleHeaderAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
