package com.example.polymed.patientservice.dto;

import java.util.List;

public class TechnologyTraceResponse {
    private String action;
    private String service;
    private String module;
    private List<String> technologyStack;
    private String businessDomain;
    private String whyThisStack;
    private String requestPath;
    private String architectureRole;

    public TechnologyTraceResponse() {}

    public TechnologyTraceResponse(String action, String service, String module, List<String> technologyStack,
                                   String businessDomain, String whyThisStack, String requestPath, String architectureRole) {
        this.action = action;
        this.service = service;
        this.module = module;
        this.technologyStack = technologyStack;
        this.businessDomain = businessDomain;
        this.whyThisStack = whyThisStack;
        this.requestPath = requestPath;
        this.architectureRole = architectureRole;
    }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getService() { return service; }
    public void setService(String service) { this.service = service; }
    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }
    public List<String> getTechnologyStack() { return technologyStack; }
    public void setTechnologyStack(List<String> technologyStack) { this.technologyStack = technologyStack; }
    public String getBusinessDomain() { return businessDomain; }
    public void setBusinessDomain(String businessDomain) { this.businessDomain = businessDomain; }
    public String getWhyThisStack() { return whyThisStack; }
    public void setWhyThisStack(String whyThisStack) { this.whyThisStack = whyThisStack; }
    public String getRequestPath() { return requestPath; }
    public void setRequestPath(String requestPath) { this.requestPath = requestPath; }
    public String getArchitectureRole() { return architectureRole; }
    public void setArchitectureRole(String architectureRole) { this.architectureRole = architectureRole; }
}
