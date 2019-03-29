from django.utils.text import slugify

from faker import Faker

import factory
from factory.django import DjangoModelFactory

from video.models import Videos
from areas.tests.faker_data import CityTownFactory

import random

fake = Faker()


class Climbing_Name_Random():
    climbs = ['The Pocket', 'Ground Zero', 'Samurai', 'The Engineer',
              'Footless Traverse', 'Beam Me Up', 'Jaws', 'Bricklayer']
    num_climbs = len(climbs) - 1
    random_num = random.randint(0, num_climbs)
    climb_name = climbs[random_num]


class VideoFactory(DjangoModelFactory):
    class Meta:
        model = Videos

    name = Climbing_Name_Random.climb_name
    city = factory.SubFactory(CityTownFactory)
    author = factory.Faker('user_name')
    thumbnail = factory.Faker('image_url')
    embed = factory.Faker('word')
    description = factory.Faker('sentence')
    slug = slugify(name)
