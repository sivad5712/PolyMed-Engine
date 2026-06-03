from django.contrib import admin
from .models import Member, Provider, Claim, Diagnosis, CareGap, ClaimAudit

admin.site.register(Member)
admin.site.register(Provider)
admin.site.register(Claim)
admin.site.register(Diagnosis)
admin.site.register(CareGap)
admin.site.register(ClaimAudit)
