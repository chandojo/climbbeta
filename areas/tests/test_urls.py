
from django.urls import reverse
from django.test import TestCase
from areas.models import State
from django.utils.text import slugify

class TestIndexView(TestCase):
    def test_view_url_exists(self):
        response = self.client.get('/areas/')
        self.assertEqual(response.status_code, 200)

class TestStateView(TestCase):
    def test_view_url_exists(self):
        state = State.objects.create(name='washington')
        slug = slugify(state.name)
        url = '/areas/{slug}/'.format(slug=slug)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
