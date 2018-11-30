from django.test import TestCase

from areas.models import *

class StateTestCase(TestCase):
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

    def test_slug_is_name(self):
        State.objects.create(name='washington')
        state = State.objects.get(id=1)
        self.assertEquals(state.slug, state.name)

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

class AreaTestCase(TestCase):
    def test_area_name_label(self):
        field_label = Area._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_area_city_town_label(self):
        field_label = Area._meta.get_field('city_town').verbose_name
        self.assertEquals(field_label, 'city town')

    def test_name_max_length(self):
        max_length = Area._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

class Boulder_WallTestCase(TestCase):
    def test_boulder_wall_name_label(self):
        field_label = Boulder_Wall._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_boulder_wall_area_label(self):
        field_label = Boulder_Wall._meta.get_field('area').verbose_name
        self.assertEquals(field_label, 'area')

    def test_name_max_length(self):
        max_length = Boulder_Wall._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)
