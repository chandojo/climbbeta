import os

api_key = os.environ['GOOGLE_API_KEY']
embed_key =  'AIzaSyCfpwIouaKdKthZAEfnjuAzgijXmcrcokg' 
map_url =  "https://maps.googleapis.com/maps/api/geocode/json?address={}&key=" + api_key
