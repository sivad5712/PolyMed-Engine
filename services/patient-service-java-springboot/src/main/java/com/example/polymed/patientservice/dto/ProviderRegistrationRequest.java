package com.example.polymed.patientservice.dto;

public class ProviderRegistrationRequest {
    private String npi;
    private String firstName;
    private String lastName;
    private String specialty;
    private String email;
    private String phone;
    private String facility;

    public ProviderRegistrationRequest() {}

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
}
