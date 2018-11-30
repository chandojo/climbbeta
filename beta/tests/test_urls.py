import unittest
import requests

from django.urls import reverse
from django.test import TestCase

from beta.views import search
from unittest.mock import patch

class IndexPathTestCase(TestCase):
    def test_index_url_exists(self):
        response = self.client.get('/beta/')
        self.assertEqual(response.status_code, 200)

# --Continue work on testing with mock API call--
#class SearchPathTestCase(TestCase):
#    @patch('beta.views.requests.get')
#    def test_results_url_exists(self, mock_get):
#        mock_get.json.return_value.status_code = 300
#        response = search(request)
#        self.assertEqual(response.status_code, 200)
