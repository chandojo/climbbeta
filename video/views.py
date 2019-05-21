
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import pagination, viewsets
from rest_framework.response import Response
from .serializers import *

class VideoPagination(pagination.PageNumberPagination):
    page_size = 6
    page_size_query_param = 'size'
    max_page_size = 100

    def get_current_page(self):
        video_pages = self.page.paginator.page_range
        number = self.page.number

        for num in video_pages:
            if number == num:
                return num

    def get_paginated_response(self, data):
        return Response({
            'current': self.get_current_page(),
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'total_videos': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })

class API_Video_View(viewsets.ModelViewSet):
    queryset = Videos.objects.all()
    serializer_class = VideoSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('city',)
    pagination_class = VideoPagination
