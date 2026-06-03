from flask import Blueprint, request, jsonify
from .services import AnalyticsService

analytics_bp = Blueprint('analytics', __name__)

def build_response(message, data, correlation_id):
    return jsonify({
        "success": True,
        "message": message,
        "data": data,
        "correlationId": correlation_id
    }), 200

def get_correlation_id():
    return request.headers.get('X-Correlation-ID', 'corr-unknown')

@analytics_bp.route('/analytics/dashboard-summary', methods=['GET'])
def dashboard_summary():
    corr_id = get_correlation_id()
    data = AnalyticsService.get_dashboard_summary()
    return build_response("Dashboard summary analytics retrieved", data, corr_id)

@analytics_bp.route('/analytics/risk-trends', methods=['GET'])
def risk_trends():
    corr_id = get_correlation_id()
    data = AnalyticsService.get_risk_trends()
    return build_response("Risk trends analytics retrieved", data, corr_id)

@analytics_bp.route('/analytics/claims-summary', methods=['GET'])
def claims_summary():
    corr_id = get_correlation_id()
    data = AnalyticsService.get_claims_summary()
    return build_response("Claims summary analytics retrieved", data, corr_id)

@analytics_bp.route('/analytics/care-gap-summary', methods=['GET'])
def care_gap_summary():
    corr_id = get_correlation_id()
    data = AnalyticsService.get_care_gap_summary()
    return build_response("Care gap summary analytics retrieved", data, corr_id)

@analytics_bp.route('/analytics/provider-workload', methods=['GET'])
def provider_workload():
    corr_id = get_correlation_id()
    data = AnalyticsService.get_provider_workload()
    return build_response("Provider workload analytics retrieved", data, corr_id)

@analytics_bp.route('/analytics/notification-summary', methods=['GET'])
def notification_summary():
    corr_id = get_correlation_id()
    data = AnalyticsService.get_notification_summary()
    return build_response("Notification delivery analytics retrieved", data, corr_id)

@analytics_bp.route('/analytics/platform-kpis', methods=['GET'])
def platform_kpis():
    corr_id = get_correlation_id()
    data = AnalyticsService.get_platform_kpis()
    return build_response("Platform KPI summary retrieved", data, corr_id)

@analytics_bp.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "UP",
        "service": "Healthcare Analytics Service"
    }), 200
