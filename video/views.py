from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *

class API_Video_View(viewsets.ModelViewSet):
    queryset = Videos.objects.all()
    serializer_class = VideoSerializer
