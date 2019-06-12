from rest_framework import viewsets
from .serializers import *
from areas.models import *


class API_State_View(viewsets.ModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer

class API_CityTown_View(viewsets.ModelViewSet):
    queryset = City_Town.objects.all()
    serializer_class = CityTownSerializer
