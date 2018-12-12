import vimeo
import os

client = vimeo.VimeoClient(
       token=os.environ['VIMEO_ACCESS_TOKEN'],
       key=os.environ['VIMEO_CLIENT_ID'],
       secret=os.environ['VIMEO_CLIENT_SECRET']
    )

video_uri = '/videos?query={}&direction=desc&sort=relevant&per_page=10'
