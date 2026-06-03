from django.test import TestCase, Client
from .models import Member, Provider, Claim

class ClaimsApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.member = Member.objects.create(
            member_id="mem-test-1",
            first_name="Jane",
            last_name="Doe",
            policy_number="POL-TEST",
            coverage_status="ACTIVE"
        )
        self.provider = Provider.objects.create(
            provider_id="prov-test-1",
            npi="1000000000",
            name="Dr. Test",
            specialty="Pediatrics"
        )

    def test_health_check(self):
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Claims Workflow Service", response.content)

    def test_get_members(self):
        response = self.client.get('/members')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data['success'])
        self.assertEqual(len(data['data']['members']), 1)
