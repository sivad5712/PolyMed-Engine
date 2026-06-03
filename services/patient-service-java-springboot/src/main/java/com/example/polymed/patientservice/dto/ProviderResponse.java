package com.example.polymed.patientservice.dto;

import com.example.polymed.patientservice.entity.Provider;

public class ProviderResponse {
    private String providerId;
    private String npi;
    private String firstName;
    private String lastName;
    private String specialty;
    private String email;
    private String phone;
    private String facility;
    private String status;

    public ProviderResponse() {}

    public ProviderResponse(Provider p) {
        this.providerId = p.getProviderId();
        this.npi = p.getNpi();
        this.firstName = p.getFirstName();
        this.lastName = p.getLastName();
        this.specialty = p.getSpecialty();
        this.email = p.getEmail();
        this.phone = p.getPhone();
        this.facility = p.getFacility();
        this.status = p.getStatus();
    }

    public String getProviderId() { return providerId; }
    public void setProviderId(String providerId) { this.providerId = providerId; }
    public String getNpi() { return npi; }
    public void setNpi(String npi) { this.npi = npi; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getFacility() { return facility; }
    public void setFacility(String facility) { this.facility = facility; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
