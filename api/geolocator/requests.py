import requests

def get_location(self, **kwargs):
    q = str(self.city) + ', ' + str(self.city.state.abbrv)
    r = requests.get(map_url.format(q)).json()
    geo_data = {
        'lat': r['results'][0]['geometry']['location']['lat'],
        'long': r['results'][0]['geometry']['location']['lng'],
    }
    return geo_data

# def get_list_location_data(self, **kwargs):
#     location_data = []
#
#     for city in self.cities:
#         q = str(self.city) + ', ' + str(self.city.state.abbrv)
#
#         r = requests.get(map_url.format(q)).json()
#
#         geo_data = {
#             'lat': r['results'][0]['geometry']['location']['lat'],
#             'long': r['results'][0]['geometry']['location']['lng'],
#         }
#
#         location_data.append(geo_data)
#
#         print(location_data)
#         return location_data
