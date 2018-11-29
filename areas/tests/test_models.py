from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile

from areas.models import *

class StateTestCase(TestCase):
    def setUp(self):
        State.objects.create(name='washington')

    def tearDown(self):
        del_state = State.objects.all()
        del del_state

    def test_state_name_label(self):
        state = State.objects.get(id=1)
        field_label = state._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_img_name_label(self):
        state = State.objects.get(id=1)
        field_label = state._meta.get_field('img').verbose_name
        self.assertEquals(field_label, 'img')

    def test_slug_name_label(self):
        state = State.objects.get(id=1)
        field_label = state._meta.get_field('slug').verbose_name
        self.assertEquals(field_label, 'slug')

    def test_name_max_length(self):
        state = State.objects.get(id=1)
        max_length = state._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

    def test_slug_is_name(self):
        state = State.objects.get(id=1)
        self.assertEquals(state.slug, state.name)

class City_TownTestCase(TestCase):
    def setUp(self):
        state = State.objects.create(name='washington')
        City_Town.objects.create(name='seattle', state=state)

    def tearDown(self):
        city = City_Town.objects.all()
        del city

    def test_city_name_label(self):
        city = City_Town.objects.get(id=1)
        field_label = city._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_city_state_label(self):
        city = City_Town.objects.get(id=1)
        field_label = city._meta.get_field('state').verbose_name
        self.assertEquals(field_label, 'state')

    def test_name_max_length(self):
        city= City_Town.objects.get(id=1)
        max_length = city._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

class AreaTestCase(TestCase):
    def setUp(self):
        state = State.objects.create(name='washington')
        city = City_Town.objects.create(name='seattle', state=state)
        Area.objects.create(name='columbia city', city_town=city)

    def tearDown(self):
        area = Area.objects.all()
        del area

    def test_area_name_label(self):
        area = Area.objects.get(id=1)
        field_label = area._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_area_city_town_label(self):
        area = Area.objects.get(id=1)
        field_label = area._meta.get_field('city_town').verbose_name
        self.assertEquals(field_label, 'city town')

    def test_name_max_length(self):
        area = Area.objects.get(id=1)
        max_length = area._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

class Boulder_WallTestCase(TestCase):
    def setUp(self):
        state = State.objects.create(name='washington')
        city = City_Town.objects.create(name='seattle', state=state)
        area = Area.objects.create(name='columbia city', city_town=city)
        boulder = Boulder_Wall.objects.create(name='renton house', area=area)

    def tearDown(self):
        boulder = Boulder_Wall.objects.all()
        del boulder

    def test_boulder_wall_name_label(self):
        boulder = Boulder_Wall.objects.get(id=1)
        field_label = boulder._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_boulder_wall_area_label(self):
        boulder = Boulder_Wall.objects.get(id=1)
        field_label = boulder._meta.get_field('area').verbose_name
        self.assertEquals(field_label, 'area')

    def test_name_max_length(self):
        boulder = Boulder_Wall.objects.get(id=1)
        max_length = boulder._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)
