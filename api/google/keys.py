import os

api_key = os.environ['GOOGLE_API_KEY']
embed_key =  'AIzaSyCfpwIouaKdKthZAEfnjuAzgijXmcrcokg'
map_url =  "https://maps.googleapis.com/maps/api/geocode/json?address={}&key=" + api_key
youtube_search_url = "https://www.googleapis.com/youtube/v3/search?q={}&type=video&order=relevance&part=snippet&maxResults=10&key=" + api_key
