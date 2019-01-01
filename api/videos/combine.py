import json
import os

from areas.models import City_Town

#python manage.py shell

this_folder = os.path.dirname(os.path.abspath('__file__'))

def read_youtube_data(self, **kwargs):
    cities = City_Town.objects.all()
    for city in cities:
        youtube_file = os.path.join(this_folder, 'api/google/youtube/response/' + str(city.name) + ' ' + str(city.state.abbrv) + '-youtube-response.json')
        vimeo_file = os.path.join(this_folder, 'api/vimeo/response/'+ str(city.name) + ' ' + str(city.state.abbrv) +'-vimeo-response.json')
        combined_file = 'api/videos/' + str(city.name) + ' ' + str(city.state.abbrv) + '-combined.json'
        concat_videos = []
        with open(youtube_file) as f1, open(vimeo_file) as f2:
            youtube = json.load(f1)
            vimeo = json.load(f2)
            for video in youtube:
                concat_videos.append(video)
            for video in vimeo:
                concat_videos.append(video)
        with open(combined_file, 'w') as f:
            json.dump(concat_videos, f)
