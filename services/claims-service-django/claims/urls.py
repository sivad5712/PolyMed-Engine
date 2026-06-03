from django.urls import path
from .views import (
    MemberListView, MemberDetailView, ProviderListView, 
    ClaimListView, ClaimReviewView, ClaimApproveView, ClaimDenyView,
    CareGapListView, ClaimAuditListView, health_check
)

urlpatterns = [
    path('members', MemberListView.as_view(), name='member-list'),
    path('members/<str:pk>', MemberDetailView.as_view(), name='member-detail'),
    path('providers', ProviderListView.as_view(), name='provider-list'),
    path('claims', ClaimListView.as_view(), name='claim-list'),
    path('claims/<str:pk>/review', ClaimReviewView.as_view(), name='claim-review'),
    path('claims/<str:pk>/approve', ClaimApproveView.as_view(), name='claim-approve'),
    path('claims/<str:pk>/deny', ClaimDenyView.as_view(), name='claim-deny'),
    path('care-gaps', CareGapListView.as_view(), name='care-gap-list'),
    path('claim-audits', ClaimAuditListView.as_view(), name='claim-audit-list'),
    path('health', health_check, name='health-check'),
]
