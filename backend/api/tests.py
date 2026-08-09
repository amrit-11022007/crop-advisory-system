from django.test import TestCase
from django.contrib.auth.models import User


class AuthApiTests(TestCase):
    def test_login_returns_sanitized_user_payload(self):
        User.objects.create_user(
            username='farmer@example.com',
            email='farmer@example.com',
            password='secret123',
            first_name='Test Farmer',
        )

        response = self.client.post(
            '/api/login/',
            {'email': 'farmer@example.com', 'password': 'secret123'},
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn('user', payload)
        self.assertNotIn('password', payload['user'])
        self.assertEqual(payload['user']['email'], 'farmer@example.com')
        self.assertEqual(payload['user']['username'], 'farmer@example.com')
        self.assertEqual(payload['user']['name'], 'Test Farmer')

    def test_register_returns_sanitized_user_payload(self):
        response = self.client.post(
            '/api/register/',
            {
                'name': 'New Farmer',
                'email': 'newfarmer@example.com',
                'password': 'secret123',
            },
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 201)
        payload = response.json()
        self.assertIn('user', payload)
        self.assertNotIn('password', payload['user'])
        self.assertEqual(payload['user']['email'], 'newfarmer@example.com')
        self.assertEqual(payload['user']['name'], 'New Farmer')
