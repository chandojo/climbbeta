from geopy.geocoders import Nominatim
from timezonefinder import TimezoneFinder

def get_location(self, **kwargs):
    geolocator = Nominatim(user_agent="climbbeta.com")
    location = geolocator.geocode(str(self.name) + ", " + str(self.state.abbrv))

    self.longitude = location.longitude
    self.latitude = location.latitude
    self.timezone = str((TimezoneFinder().timezone_at(lng=location.longitude, lat=location.latitude)))

    return self.longitude, self.latitude, self.timezone
