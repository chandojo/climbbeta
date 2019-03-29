from django.core.management.base import BaseCommand, CommandError
from video.api.get_all_videos import compile_videos


class Command(BaseCommand):
    help = 'Compile all city videos into one fixture file'

    def handle(self, *args, **options):
        return compile_videos()
