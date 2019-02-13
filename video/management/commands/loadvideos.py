from django.core import management
from django.core.management.base import BaseCommand, CommandError
from django.core.management.commands import loaddata
from datetime import date

class Command(BaseCommand):
    def handle(self, *args, **options):
        today = str(date.today())
        return management.call_command('loaddata', today + '.json')
