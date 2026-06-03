import time

class AnalyticsService:

    @staticmethod
    def get_dashboard_summary():
        return {
            "generatedAt": "2026-06-02T17:37:55Z",
            "totalPatients": 1250,
            "highRiskPatients": 48,
            "claimsPendingReview": 142,
            "openCareGaps": 310,
            "patientComplianceRate": 74.8
        }

    @staticmethod
    def get_risk_trends():
        return {
            "totalRiskScoresGenerated": 450,
            "riskTierDistribution": {
                "LOW_RISK": 280,
                "MEDIUM_RISK": 122,
                "HIGH_RISK": 48
            },
            "averageRiskScore": 34.2,
            "monthlyAverages": [
                { "month": "2026-03", "avgScore": 32.5 },
                { "month": "2026-04", "avgScore": 33.1 },
                { "month": "2026-05", "avgScore": 34.2 }
            ]
        }

    @staticmethod
    def get_claims_summary():
        return {
            "totalClaimsProcessed": 4890,
            "totalChargedAmount": 1100250.0,
            "totalPaidAmount": 880200.0,
            "claimStatusBreakdown": {
                "SUBMITTED": 12,
                "UNDER_REVIEW": 30,
                "APPROVED": 4120,
                "DENIED": 728
            },
            "denialRatePercentage": 14.88
        }

    @staticmethod
    def get_care_gap_summary():
        return {
            "totalMeasuresTracked": 8,
            "gapsDistribution": [
                { "measureCode": "A1C-TEST", "totalGaps": 110, "open": 40, "closed": 70, "compliance": 63.6 },
                { "measureCode": "COLON-SCREEN", "totalGaps": 85, "open": 25, "closed": 60, "compliance": 70.5 },
                { "measureCode": "BP-CONTROL", "totalGaps": 115, "open": 45, "closed": 70, "compliance": 60.8 }
            ],
            "overallCompliance": 64.9
        }

    @staticmethod
    def get_provider_workload():
        return {
            "providersList": [
                {
                    "providerId": "prov-11029",
                    "name": "Sarah Jenkins",
                    "assignedPatients": 145,
                    "openCareGapsCount": 38,
                    "claimsSubmittedMonth": 52
                },
                {
                    "providerId": "prov-33410",
                    "name": "David Miller",
                    "assignedPatients": 98,
                    "openCareGapsCount": 18,
                    "claimsSubmittedMonth": 31
                }
            ]
        }

    @staticmethod
    def get_notification_summary():
        return {
            "totalNotificationsSent": 10580,
            "deliverySuccessRate": 99.4,
            "channelBreakdown": {
                "EMAIL": 6500,
                "SMS": 3800,
                "PORTAL_ALERT": 280
            }
        }

    @staticmethod
    def get_platform_kpis():
        return {
            "systemUptimeSeconds": int(time.time()) % 100000,
            "averageResponseTimeMs": 42.8,
            "activeWebSocketConnections": 14,
            "memoryUtilizationPercentage": 68.2
        }
