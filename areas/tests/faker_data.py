from faker import Faker

import factory
from factory.django import DjangoModelFactory

from areas.models import City_Town, State

from areas.tests.usaCities import city_state_list
import random

fake = Faker()


class Random_Location():
    num_cities = len(city_state_list) - 1
    rand_num = random.randint(0, num_cities)
    city = city_state_list[rand_num]['city']
    state = city_state_list[rand_num]['state']


class StateFactory(DjangoModelFactory):
    class Meta:
        model = State
        exclude = ('abbrv', 'img', 'slug')

    name = Random_Location.state
    abbrv = factory.Faker('state_abbr', include_territories=False)
    img = factory.Faker('file_path', depth=1, category='image', extension=None)


class CityTownFactory(DjangoModelFactory):
    class Meta:
        model = City_Town
        exclude = ('longitude', 'latitude', 'slug', 'timezone')

    name = Random_Location.city
    state = factory.SubFactory(StateFactory)
