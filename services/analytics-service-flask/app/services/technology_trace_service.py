class TechnologyTraceService:

    @staticmethod
    def get_trace(action, request_path):
        return {
            "action": action,
            "service": "Healthcare Analytics Service",
            "module": "analytics-service-flask",
            "technologyStack": ["Flask"],
            "businessDomain": "Healthcare Analytics",
            "whyThisStack": "Flask is used for lightweight analytics and KPI reporting endpoints due to its fast execution and micro-footprint.",
            "requestPath": request_path,
            "architectureRole": "Exposes performance indexes and dashboard reporting metrics."
        }
