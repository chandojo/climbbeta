from django.test import TestCase

from areas.models import *
from video.models import *


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
    def setUpClass(cls):
        cls.state = State.objects.create(name='Washington')
        cls.city = City_Town.objects.create(
            name='Leavenworth', state=cls.state)
        Videos.objects.create(name='This is a test', city=cls.city, author="Freddie Mercury",
                              thumbnail="https://www.example.com/example.jpg", embed="sdf34bg", description="this is a description for a test")
        cls.video = Videos.objects.get(name='This is a test')

    @classmethod
    def tearDownClass(cls):
        pass
        #cls.video = None

    def test_city_is_name(self):
        self.assertEquals(str(self.video.city), 'Leavenworth')

    def test_url_is_http(self):
        self.assertIn('https://', self.video.thumbnail)

    def test_url_is_name(self):
        self.assertEquals(self.video.thumbnail,
                          'https://www.example.com/example.jpg')

    def test_author_is_name(self):
        self.assertEquals(self.video.author, 'Freddie Mercury')

    def test_slug_is_name(self):
        self.assertEquals(self.video.slug, 'this-is-a-test')
