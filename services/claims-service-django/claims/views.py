import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views import View
from .models import Member, Provider, Claim, Diagnosis, CareGap, ClaimAudit
from .technology_trace import get_technology_trace

# Helper to build standard response envelopes
def build_success(message, data, correlation_id="corr-unknown", trace=None):
    return JsonResponse({
        "success": True,
        "message": message,
        "data": data,
        "technologyTrace": trace or {},
        "correlationId": correlation_id
    }, status=200)

def build_created(message, data, correlation_id="corr-unknown", trace=None):
    return JsonResponse({
        "success": True,
        "message": message,
        "data": data,
        "technologyTrace": trace or {},
        "correlationId": correlation_id
    }, status=201)

def build_error(error_code, message, status=400, correlation_id="corr-unknown", trace=None):
    return JsonResponse({
        "success": False,
        "errorCode": error_code,
        "message": message,
        "details": [],
        "technologyTrace": trace or {},
        "correlationId": correlation_id
    }, status=status)

def get_correlation_id(request):
    return request.headers.get('X-Correlation-ID', 'corr-unknown')

# Seeder helper to ensure DB is never empty on query
def ensure_seeded():
    if Member.objects.count() == 0:
        member = Member.objects.create(
            member_id="mem-44910",
            first_name="John",
            last_name="Doe",
            policy_number="POL-9910293",
            coverage_status="ACTIVE"
        )
        provider = Provider.objects.create(
            provider_id="prov-11029",
            npi="1992837465",
            name="Sarah Jenkins",
            specialty="Cardiology"
        )
        CareGap.objects.create(
            gap_id="gap-1002",
            member=member,
            measure_code="A1C-TEST",
            status="OPEN"
        )
        claim = Claim.objects.create(
            claim_id="clm-55902",
            member=member,
            provider=provider,
            date_of_service="2026-05-10",
            total_charged=225.0,
            adjudicated_amount=180.0,
            patient_responsibility=45.0,
            status="APPROVED",
            reviewer_notes="Pre-authorization on file, CPT codes match diagnosis, approved at contract rate."
        )
        Diagnosis.objects.create(
            claim=claim,
            code="ICD10-I10",
            description="Essential Hypertension"
        )
        ClaimAudit.objects.create(
            claim=claim,
            action="SUBMITTED",
            username="claims_entry_clerk"
        )
        ClaimAudit.objects.create(
            claim=claim,
            action="ADJUDICATED",
            username="claims_reviewer_bot"
        )

# View for Members
class MemberListView(View):
    def get(self, request):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        members = list(Member.objects.values())
        trace = get_technology_trace("SUBMIT_CLAIM", "/api/claims/members")
        return build_success("Members retrieved successfully", {"members": members}, corr_id, trace)

class MemberDetailView(View):
    def get(self, request, pk):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        trace = get_technology_trace("SUBMIT_CLAIM", f"/api/claims/members/{pk}")
        try:
            member = Member.objects.get(pk=pk)
            data = {
                "memberId": member.member_id,
                "firstName": member.first_name,
                "lastName": member.last_name,
                "policyNumber": member.policy_number,
                "coverageStatus": member.coverage_status
            }
            return build_success("Member details retrieved", data, corr_id, trace)
        except Member.DoesNotExist:
            return build_error("RESOURCE_NOT_FOUND", f"Member {pk} not found", 404, corr_id, trace)

# View for Providers
class ProviderListView(View):
    def get(self, request):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        providers = list(Provider.objects.values())
        trace = get_technology_trace("SUBMIT_CLAIM", "/api/claims/providers")
        return build_success("Providers list retrieved", {"providers": providers}, corr_id, trace)

# View for Claims Submission and Listing
@method_decorator(csrf_exempt, name='dispatch')
class ClaimListView(View):
    def get(self, request):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        trace = get_technology_trace("SUBMIT_CLAIM", "/api/claims")
        claims = []
        for c in Claim.objects.all():
            claims.append({
                "claimId": c.claim_id,
                "memberId": c.member_id,
                "providerId": c.provider_id,
                "dateOfService": str(c.date_of_service),
                "totalCharged": float(c.total_charged),
                "adjudicatedAmount": float(c.adjudicated_amount),
                "patientResponsibility": float(c.patient_responsibility),
                "status": c.status,
                "reviewerNotes": c.reviewer_notes,
                "denialReason": c.denial_reason
            })
        return build_success("Claims retrieved successfully", {"claims": claims}, corr_id, trace)

    def post(self, request):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        trace = get_technology_trace("SUBMIT_CLAIM", "/api/claims")
        try:
            body = json.loads(request.body)
            member = Member.objects.get(pk=body.get('memberId'))
            provider = Provider.objects.get(pk=body.get('providerId'))
            
            claim = Claim.objects.create(
                claim_id=body.get('claimId') or f"clm-{Claim.objects.count() + 10001}",
                member=member,
                provider=provider,
                date_of_service=body.get('dateOfService') or "2026-06-02",
                total_charged=body.get('totalCharged'),
                status='SUBMITTED'
            )
            
            diagnoses = body.get('diagnoses', [])
            for d in diagnoses:
                Diagnosis.objects.create(
                    claim=claim,
                    code=d.get('code'),
                    description=d.get('description')
                )
                
            ClaimAudit.objects.create(
                claim=claim,
                action='SUBMITTED',
                username=request.headers.get('X-Role-Header', 'claims_entry_clerk')
            )
            
            data = {
                "claimId": claim.claim_id,
                "status": claim.status,
                "totalCharged": float(claim.total_charged)
            }
            return build_created("Claim submitted successfully", data, corr_id, trace)
        except (Member.DoesNotExist, Provider.DoesNotExist):
            return build_error("RESOURCE_NOT_FOUND", "Referenced Member or Provider does not exist", 400, corr_id, trace)
        except Exception as e:
            return build_error("VALIDATION_ERROR", f"Error parsing submission: {str(e)}", 400, corr_id, trace)

# Adjudication view splits: Review, Approve, Deny
@method_decorator(csrf_exempt, name='dispatch')
class ClaimReviewView(View):
    def post(self, request, pk):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        trace = get_technology_trace("ADJUDICATE_CLAIM", f"/api/claims/{pk}/review")
        try:
            claim = Claim.objects.get(pk=pk)
            claim.status = 'UNDER_REVIEW'
            claim.reviewer_notes = "Sent to medical director review queue."
            claim.save()
            
            ClaimAudit.objects.create(claim=claim, action='UNDER_REVIEW', username='claims_reviewer')
            data = { "claimId": claim.claim_id, "status": claim.status }
            return build_success("Claim status updated to Under Review", data, corr_id, trace)
        except Claim.DoesNotExist:
            return build_error("RESOURCE_NOT_FOUND", "Claim not found", 404, corr_id, trace)

@method_decorator(csrf_exempt, name='dispatch')
class ClaimApproveView(View):
    def post(self, request, pk):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        trace = get_technology_trace("ADJUDICATE_CLAIM", f"/api/claims/{pk}/approve")
        try:
            claim = Claim.objects.get(pk=pk)
            body = json.loads(request.body) if request.body else {}
            
            claim.status = 'APPROVED'
            claim.adjudicated_amount = body.get('adjudicatedAmount', float(claim.total_charged) * 0.8)
            claim.patient_responsibility = body.get('patientResponsibility', float(claim.total_charged) * 0.2)
            claim.reviewer_notes = body.get('reviewerNotes', "Approved automatically via workflow engine.")
            claim.save()
            
            ClaimAudit.objects.create(claim=claim, action='APPROVED', username='claims_adjudicator')
            data = {
                "claimId": claim.claim_id,
                "status": claim.status,
                "adjudicatedAmount": float(claim.adjudicated_amount),
                "patientResponsibility": float(claim.patient_responsibility)
            }
            return build_success("Claim approved successfully", data, corr_id, trace)
        except Claim.DoesNotExist:
            return build_error("RESOURCE_NOT_FOUND", "Claim not found", 404, corr_id, trace)

@method_decorator(csrf_exempt, name='dispatch')
class ClaimDenyView(View):
    def post(self, request, pk):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        trace = get_technology_trace("ADJUDICATE_CLAIM", f"/api/claims/{pk}/deny")
        try:
            claim = Claim.objects.get(pk=pk)
            body = json.loads(request.body) if request.body else {}
            
            claim.status = 'DENIED'
            claim.denial_reason = body.get('denialReason', "Lack of prior authorization.")
            claim.reviewer_notes = body.get('reviewerNotes', "Denied upon review of clinical parameters.")
            claim.save()
            
            ClaimAudit.objects.create(claim=claim, action='DENIED', username='claims_adjudicator')
            data = {
                "claimId": claim.claim_id,
                "status": claim.status,
                "denialReason": claim.denial_reason
            }
            return build_success("Claim denied", data, corr_id, trace)
        except Claim.DoesNotExist:
            return build_error("RESOURCE_NOT_FOUND", "Claim not found", 404, corr_id, trace)

# View for Care Gaps
class CareGapListView(View):
    def get(self, request):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        gaps = list(CareGap.objects.values())
        trace = get_technology_trace("SUBMIT_CLAIM", "/api/claims/care-gaps")
        return build_success("Care gaps list retrieved", {"careGaps": gaps}, corr_id, trace)

# View for Claim Audits
class ClaimAuditListView(View):
    def get(self, request):
        ensure_seeded()
        corr_id = get_correlation_id(request)
        audits = []
        for a in ClaimAudit.objects.all():
            audits.append({
                "claimId": a.claim.claim_id,
                "action": a.action,
                "username": a.username,
                "timestamp": str(a.timestamp)
            })
        trace = get_technology_trace("SUBMIT_CLAIM", "/api/claims/claim-audits")
        return build_success("Claims audit log retrieved", {"audits": audits}, corr_id, trace)

# Service health view
def health_check(request):
    return JsonResponse({"status": "UP", "service": "Claims Workflow Service"})
