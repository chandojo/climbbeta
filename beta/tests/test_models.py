from unittest import mock
from django.test import TestCase

from beta.models import *

class VideoTestCase(TestCase):
    def test_beta_video_name_label(self):
        field_label = Beta_Video._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_beta_video_video_label(self):
        field_label = Beta_Video._meta.get_field('video').verbose_name
        self.assertEquals(field_label, 'video')

    def test_beta_area_name_label(self):
        field_label = Beta_Video._meta.get_field('area').verbose_name
        self.assertEquals(field_label, 'area')

    def test_name_max_length(self):
        field_label = Beta_Video._meta.get_field('name').max_length
        self.assertEquals(field_label, 255)
