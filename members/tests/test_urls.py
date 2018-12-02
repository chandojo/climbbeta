from django.test import TestCase

class LoginTestCase(TestCase):
    def setUp(self):
        self.response = self.client.get('/members/')
    def test_login_url_exists(self):
        self.assertEqual(self.response.status_code, 200)

    def test_login_template_exists(self):
        self.assertTemplateUsed(self.response, 'members/login.html')

class LogoutTestCase(TestCase):
    def setUp(self):
        self.response = self.client.get('/members/loggedout/')

    def test_logout_url_exists(self):
        self.assertEqual(self.response.status_code, 200)

    def test_logout_template_exists(self):
        self.assertTemplateUsed(self.response, 'members/loggedout.html')

class SignupTestCase(TestCase):
    def setUp(self):
        self.response = self.client.get('/members/signup/')
        
    def test_signup_url_exists(self):
        self.assertEqual(self.response.status_code, 200)

    def test_signup_template_exists(self):
        self.assertTemplateUsed(self.response, 'members/signup.html')
