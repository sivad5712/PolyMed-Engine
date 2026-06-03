package com.example.polymed.patientservice.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class RoleHeaderAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String roleHeader = request.getHeader("X-Role-Header");
        
        if (roleHeader != null) {
            roleHeader = roleHeader.trim().toUpperCase();
            
            // Validate allowed roles
            if (List.of("ADMIN", "CLINICIAN", "CARE_MANAGER", "CLAIMS_REVIEWER", "AUDITOR").contains(roleHeader)) {
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + roleHeader);
                PreAuthenticatedAuthenticationToken auth = new PreAuthenticatedAuthenticationToken(
                        "polymed-user", 
                        null, 
                        Collections.singleton(authority)
                );
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
