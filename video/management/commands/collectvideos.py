from django.core.management.base import BaseCommand, CommandError
from video.api.get_all_videos import get_all_city_videos


class Command(BaseCommand):
    help = 'Request city videos from YouTube and Vimeo'

    def handle(self, *args, **options):
        return  get_all_city_videos()
