from django.contrib.auth.models import User
from rest_framework.test import APITestCase, force_authenticate
from rest_framework import status

from areas.models import *

class APIStateTests(APITestCase):
    def test_get_states(self):
<<<<<<< HEAD
        url = '/areas/api/states/'
=======
        url = 'http://127.0.0.1:8000/areas/api/states/'
>>>>>>> 347ae11... [ISSUE]: #25 Testing for Django REST Framework
        data = {}
        response = self.client.get(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_states(self):
<<<<<<< HEAD
        url = '/areas/api/states/'
=======
        url = 'http://127.0.0.1:8000/areas/api/states/'
>>>>>>> 347ae11... [ISSUE]: #25 Testing for Django REST Framework
        data = {"name":"Nevada", "abbrv":"NV", "slug":"nevada", "img":"null"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class APICitiesTests(APITestCase):
    def test_get_cities(self):
<<<<<<< HEAD
        url = '/areas/api/cities/'
=======
        url = 'http://127.0.0.1:8000/areas/api/cities/'
>>>>>>> 347ae11... [ISSUE]: #25 Testing for Django REST Framework
        data = {}
        response = self.client.get(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_cities(self):
<<<<<<< HEAD
        url = '/areas/api/cities/'
=======
        url = 'http://127.0.0.1:8000/areas/api/cities/'
>>>>>>> 347ae11... [ISSUE]: #25 Testing for Django REST Framework
        data = {"name":"Las Vegas", "state": "Nevada"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
