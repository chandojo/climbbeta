from django.test import TestCase
from django.utils.text import slugify
from faker import Faker
from areas.models import *
from areas.tests.faker_data import Random_Location, StateFactory, CityTownFactory

fake = Faker()


class StateLabelTestCase(TestCase):
    def test_state_name_label(self):
        field_label = State._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_img_name_label(self):
        field_label = State._meta.get_field('img').verbose_name
        self.assertEquals(field_label, 'img')

    def test_slug_name_label(self):
        field_label = State._meta.get_field('slug').verbose_name
        self.assertEquals(field_label, 'slug')

    def test_name_max_length(self):
        max_length = State._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

    def test_abbrv_max_length(self):
        max_length = State._meta.get_field('abbrv').max_length
        self.assertEquals(max_length, 2)


class StateFunctionsTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        StateFactory.create()
        cls.state = State.objects.get(id=1)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def test_slug_is_name(self):
        test_slug = slugify(self.state.name)
        self.assertEquals(self.state.slug, test_slug)


class City_TownTestCase(TestCase):
    def test_city_name_label(self):
        field_label = City_Town._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_city_state_label(self):
        field_label = City_Town._meta.get_field('state').verbose_name
        self.assertEquals(field_label, 'state')

    def test_name_max_length(self):
        max_length = City_Town._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)


class CityFunctionsTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        CityTownFactory.create()
        cls.city = City_Town.objects.get(name=Random_Location.city)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def test_slug_is_name(self):
        test_slug = slugify(self.city.name)
        self.assertEquals(self.city.slug, test_slug)
