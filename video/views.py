
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import pagination, viewsets
from rest_framework.response import Response
from .serializers import *

class VideoPagination(pagination.PageNumberPagination):
    page_size = 6
    page_size_query_param = 'size'


class API_Video_View(viewsets.ModelViewSet):
    queryset = Videos.objects.all()
    serializer_class = VideoSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('city',)
    pagination_class = VideoPagination
