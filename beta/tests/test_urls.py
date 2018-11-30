from django.urls import reverse
from django.test import TestCase

class TestIndexPath(TestCase):
    def test_index_url_exists(self):
        response = self.client.get('/beta/')
        self.assertEqual(response.status_code, 200)

    def test_results_url_exists(self):
        response = self.client.get('/beta/results/')
        self.assertEqual(response.status_code, 200)
