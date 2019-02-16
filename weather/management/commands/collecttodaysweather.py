from django.core.management.base import BaseCommand, CommandError
from weather.api.get_weather import get_todays_weather


class Command(BaseCommand):
    help = 'Get today\'s weather'

    def handle(self, *args, **options):
        return get_todays_weather()
