from faker import Faker
from faker.providers import BaseProvider

import factory
from factory.django import DjangoModelFactory
import random

from video.models import Videos
from areas.models import City_Town, State

fake = Faker()


class StateFactory(DjangoModelFactory):
    class Meta:
        model = State
        exclude = ('abbrv', 'img', 'slug')

    name = factory.Faker('state')


class CityTownFactory(DjangoModelFactory):
    class Meta:
        model = City_Town
        exclude = ('longitude', 'latitude', 'slug', 'timezone')

    name = factory.Faker('city')
    state = factory.SubFactory(StateFactory)
    longitude = factory.Faker('longitude')
    latitude = factory.Faker('latitude')
    timezone = factory.Faker('timezone')


class VideoFactory(DjangoModelFactory):
    class Meta:
        model = Videos

    name = factory.Faker('word')
    city = factory.SubFactory(CityTownFactory)
    author = factory.Faker('name')
    thumbnail = factory.Faker('image_url')
    embed = factory.Faker('user_name')
    description = factory.Faker('sentence')
    slug = factory.Faker('word')
