from flask import Blueprint, request, jsonify
from ..services.analytics_service import AnalyticsService
from ..services.technology_trace_service import TechnologyTraceService

analytics_bp = Blueprint('analytics', __name__)

def build_response(message, data, action, path):
    corr_id = request.headers.get('X-Correlation-ID', 'corr-unknown')
    trace = TechnologyTraceService.get_trace(action, path)
    return jsonify({
        "success": True,
        "message": message,
        "data": data,
        "technologyTrace": trace,
        "correlationId": corr_id
    }), 200

@analytics_bp.route('/analytics/dashboard-summary', methods=['GET'])
def dashboard_summary():
    data = AnalyticsService.get_dashboard_summary()
    return build_response("Dashboard summary statistics retrieved", data, "GET_ANALYTICS", "/api/analytics/summary")

@analytics_bp.route('/analytics/risk-trends', methods=['GET'])
def risk_trends():
    data = AnalyticsService.get_risk_trends()
    return build_response("Risk score trends analytics retrieved", data, "GET_ANALYTICS", "/api/analytics/risk")

@analytics_bp.route('/analytics/claims-summary', methods=['GET'])
def claims_summary():
    data = AnalyticsService.get_claims_summary()
    return build_response("Claims aggregation analytics retrieved", data, "GET_ANALYTICS", "/api/analytics/claims")

@analytics_bp.route('/analytics/care-gap-summary', methods=['GET'])
def care_gap_summary():
    data = AnalyticsService.get_care_gap_summary()
    return build_response("Care gaps analytics retrieved", data, "GET_ANALYTICS", "/api/analytics/care-gaps")

@analytics_bp.route('/analytics/provider-workload', methods=['GET'])
def provider_workload():
    data = AnalyticsService.get_provider_workload()
    return build_response("Provider workload analytics retrieved", data, "GET_ANALYTICS", "/api/analytics/provider-workload")

@analytics_bp.route('/analytics/notification-summary', methods=['GET'])
def notification_summary():
    data = AnalyticsService.get_notification_summary()
    return build_response("Notification statistics retrieved", data, "GET_ANALYTICS", "/api/analytics/notification-summary")

@analytics_bp.route('/analytics/platform-kpis', methods=['GET'])
def platform_kpis():
    data = AnalyticsService.get_platform_kpis()
    return build_response("Platform performance KPIs retrieved", data, "GET_ANALYTICS", "/api/analytics/platform-kpis")

@analytics_bp.route('/analytics/technology-usage', methods=['GET'])
def technology_usage():
    data = AnalyticsService.get_technology_usage()
    return build_response("Analytics technology stack usage stats retrieved", data, "GET_ANALYTICS", "/api/analytics/technology-usage")
