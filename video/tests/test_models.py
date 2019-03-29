from django.test import TestCase

from areas.models import *
from video.models import *
from .faker_data import *


class VideosLabelTestCase(TestCase):
    def test_videos_name_label(self):
        field_label = Videos._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_city_name_label(self):
        field_label = Videos._meta.get_field('city').verbose_name
        self.assertEquals(field_label, 'city')

    def test_author_name_label(self):
        field_label = Videos._meta.get_field('author').verbose_name
        self.assertEquals(field_label, 'author')

    def test_thumbnail_name_label(self):
        field_label = Videos._meta.get_field('thumbnail').verbose_name
        self.assertEquals(field_label, 'thumbnail')

    def test_embed_name_label(self):
        field_label = Videos._meta.get_field('embed').verbose_name
        self.assertEquals(field_label, 'embed')

    def test_description_name_label(self):
        field_label = Videos._meta.get_field('description').verbose_name
        self.assertEquals(field_label, 'description')

    def test_slug_name_label(self):
        field_label = Videos._meta.get_field('slug').verbose_name
        self.assertEquals(field_label, 'slug')


class VideoFieldLengthTestCase(TestCase):
    def test_name_max_length(self):
        max_length = Videos._meta.get_field('name').max_length
        self.assertEquals(max_length, 255)

    def test_author_max_length(self):
        max_length = Videos._meta.get_field('author').max_length
        self.assertEquals(max_length, 100)

    def test_thumbnail_max_length(self):
        max_length = Videos._meta.get_field('thumbnail').max_length
        self.assertEquals(max_length, 200)


class VideosContentTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        VideoFactory.create()
        cls.video = Videos.objects.get(name=Climbing_Name_Random.climb_name)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def test_url_is_http(self):
        self.assertIn('https://', self.video.thumbnail)
