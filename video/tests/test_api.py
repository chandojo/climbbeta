from django.contrib.auth.models import User
from rest_framework.test import APITestCase, force_authenticate
from rest_framework import status

from video.models import *

class APIVideoTests(APITestCase):
    def test_get_video(self):
        url = '/video/api/videos/'
        data = {}
        response = self.client.get(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_video(self):
        url = '/areas/api/states/'
        data = {
            "uri": "https://example.com/video-test",
            "created": "2019-01-06T18:49:56.000Z",
            "name": "This is a test video",
            "author": "Test Author",
            "thumbnail": "https://example.com/img/test-image.jpg",
            "description": "This is a test video",        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
