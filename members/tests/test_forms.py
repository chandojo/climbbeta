from django.test import TestCase
from unittest.mock import Mock

from members.forms import SignupForm


class SignupFormTestCase(TestCase):
    def setUp(self):
        self.form = SignupForm()

    def tearDown(self):
        self.form = None

    def test_username_field_label(self):
        self.assertEquals(self.form.fields['username'].label, 'Username')

    def test_password1_field_label(self):
        self.assertEquals(self.form.fields['password1'].label, 'Password')

    def test_password2_field_label(self):
        self.assertEquals(self.form.fields['password2'].label, 'Password confirmation')

class ValueValidTestFase(TestCase):
    def setUp(self):
        self.form = Mock(spec=SignupForm)
        self.form.username = 'user-123'
        self.form.password1 = 'password123'
        self.form.password2 = 'password123'

    def tearDown(self):
        self.form = None

    def test_valid_username(self):
        self.assertEquals(self.form.username, 'user-123')

    def test_valid_password1(self):
        self.assertEquals(self.form.password1, 'password123')

    def test_valid_password2(self):
        self.assertEquals(self.form.password2, 'password123')
