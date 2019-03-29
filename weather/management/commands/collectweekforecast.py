from django.core.management.base import BaseCommand, CommandError
from weather.api.get_weather import get_forecast_data


class Command(BaseCommand):
    help = 'Get this week\'s weather'

    def handle(self, *args, **options):
        return get_forecast_data()
