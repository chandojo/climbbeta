import json
import os

this_folder = os.path.dirname(os.path.abspath('__file__'))

def read_youtube_data(self, **kwargs):
youtube_file = os.path.join(this_folder, 'api/google/youtube/response/Gold Bar WA-youtube-response.json')
vimeo_file = os.path.join(this_folder, 'api/vimeo/response/Gold Bar WA-vimeo-response.json')
combined_file = 'api/videos/response.json'
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
