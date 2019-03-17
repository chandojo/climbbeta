
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .serializers import *


class API_Video_View(viewsets.ModelViewSet):
    queryset = Videos.objects.all()
    serializer_class = VideoSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('city',)
