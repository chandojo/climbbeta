from django.urls import reverse
from django.test import TestCase
from areas.models import State
from django.utils.text import slugify


class IndexViewTestCase(TestCase):
    def test_view_template_match(self):
        response = self.client.get('/areas/')
        self.assertTemplateUsed(response, 'areas/index.html')

class StateViewTestCase(TestCase):
    def test_view_template_match(self):
        state = State.objects.create(name='washington')
        slug = slugify(state.name)
        url = '/areas/{slug}/'.format(slug=slug)
        response = self.client.get(url)
        self.assertTemplateUsed(response, 'areas/state.html')
