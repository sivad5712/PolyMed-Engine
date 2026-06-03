from django.db import models

class Member(models.Model):
    member_id = models.CharField(max_length=50, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    policy_number = models.CharField(max_length=50)
    coverage_status = models.CharField(max_length=20, default='ACTIVE') # ACTIVE, INACTIVE

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.member_id})"

class Provider(models.Model):
    provider_id = models.CharField(max_length=50, primary_key=True)
    npi = models.CharField(max_length=10)
    name = models.CharField(max_length=150)
    specialty = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.specialty}"

class Claim(models.Model):
    STATUS_CHOICES = [
        ('SUBMITTED', 'Submitted'),
        ('UNDER_REVIEW', 'Under Review'),
        ('APPROVED', 'Approved'),
        ('DENIED', 'Denied')
    ]
    claim_id = models.CharField(max_length=50, primary_key=True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    date_of_service = models.DateField()
    total_charged = models.DecimalField(max_digits=10, decimal_places=2)
    adjudicated_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    patient_responsibility = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SUBMITTED')
    reviewer_notes = models.TextField(blank=True, null=True)
    denial_reason = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Claim {self.claim_id} - {self.status}"

class Diagnosis(models.Model):
    claim = models.ForeignKey(Claim, related_name='diagnoses', on_delete=models.CASCADE)
    code = models.CharField(max_length=20) # ICD-10
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.code} - {self.description}"

class CareGap(models.Model):
    gap_id = models.CharField(max_length=50, primary_key=True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    measure_code = models.CharField(max_length=50)
    status = models.CharField(max_length=20, default='OPEN') # OPEN, CLOSED

    def __str__(self):
        return f"{self.measure_code} - {self.status}"

class ClaimAudit(models.Model):
    claim = models.ForeignKey(Claim, on_delete=models.CASCADE)
    action = models.CharField(max_length=50) # SUBMITTED, ADJUDICATED, DENIED
    username = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Audit {self.claim.claim_id} - {self.action} by {self.username}"
