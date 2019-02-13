from django.core import management
from django.core.management.base import BaseCommand, CommandError
from django.core.management.commands import loaddata
from video.api.get_all_videos import get_all_city_videos, compile_videos
from datetime import date


class Command(BaseCommand):
    help = 'Request city videos from YouTube and Vimeo'

    def handle(self, *args, **options):
        return  get_all_city_videos()

#    def handle(self, *args, **options):
#        return compile_videos()
