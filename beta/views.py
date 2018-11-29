import requests
import vimeo
import os

from django.db.models import Q
from django.shortcuts import render
from django.views import View


from .models import Beta_Video

# Create your views here.
def index(request):
   return render(request, 'beta/index.html')

def search(request):
    template='beta/index.html'
    q = request.GET.get('q')

    client = vimeo.VimeoClient(
       token=os.environ['VIMEO_ACCESS_TOKEN'],
       key=os.environ['VIMEO_CLIENT_ID'],
       secret=os.environ['VIMEO_CLIENT_SECRET']
    )

    video_uri = '/videos?query={}&direction=desc&sort=plays&per_page=10'
    response = client.get(video_uri.format(q), params={"fields": "uri, name, description, embed, pictures, user" }).json()

    beta_videos = []

    for i in range(0, len(response['data'])):
       video_data = {
            'uri':response['data'][i]['uri'],
            'name':response['data'][i]['name'],
            'user':response['data'][i]['user']['name'],
            'description':response['data'][i]['description'],
            'embed':response['data'][i]['embed']['html'],
            'picture':response['data'][i]['pictures']['sizes'][2]['link'],
       }

       beta_videos.append(video_data)

    print(beta_videos)
    context = {'beta_videos':beta_videos}
    return render(request, template, context)
