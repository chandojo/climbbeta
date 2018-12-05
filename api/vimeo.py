q = request.GET.get('q')

client = vimeo.VimeoClient(
       token=os.environ['VIMEO_ACCESS_TOKEN'],
       key=os.environ['VIMEO_CLIENT_ID'],
       secret=os.environ['VIMEO_CLIENT_SECRET']
    )

video_uri = '/videos?query={}&direction=desc&sort=plays&per_page=10'

response = client.get(video_uri.format(q), params={"fields": "uri, name, description, embed, pictures, user" }).json()
