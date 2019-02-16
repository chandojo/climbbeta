import vimeo
import os

client = vimeo.VimeoClient(
       token=os.environ['VIMEO_ACCESS_TOKEN'],
       key=os.environ['VIMEO_CLIENT_ID'],
       secret=os.environ['VIMEO_CLIENT_SECRET']
    )

video_url = '/videos?query={}&direction=desc&sort=relevant&per_page=20'

api_key = os.environ['GOOGLE_API_KEY']
youtube_search_url = "https://www.googleapis.com/youtube/v3/search?q={}&type=video&order=relevance&part=snippet&maxResults=10&videoEmbeddable=true&videoSyndicated=true&key=" + api_key
