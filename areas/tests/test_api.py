from django.contrib.auth.models import User
from rest_framework.test import APITestCase, force_authenticate
from rest_framework import status

from areas.models import *

class APIStateTests(APITestCase):
    def test_get_states(self):
        url = '/areas/api/states/'
        data = {}
        response = self.client.get(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_states(self):
        url = '/areas/api/states/'
        data = {"name":"Nevada", "abbrv":"NV", "slug":"nevada", "img":"null"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class APICitiesTests(APITestCase):
    def test_get_cities(self):
        url = '/areas/api/cities/'
        data = {}
        response = self.client.get(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_cities(self):
        url = '/areas/api/cities/'
        data = {"name":"Las Vegas", "state": "Nevada"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
