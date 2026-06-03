def get_technology_trace(action, request_path):
    return {
        "action": action,
        "service": "Claims Workflow Service",
        "module": "claims-service-django",
        "technologyStack": ["Django"],
        "businessDomain": "Healthcare Claims Workflow",
        "whyThisStack": "Django is used to model structured healthcare claim workflows, member records, provider records, and claim review processes.",
        "requestPath": request_path,
        "architectureRole": "Domain service responsible for healthcare claims processing."
    }
