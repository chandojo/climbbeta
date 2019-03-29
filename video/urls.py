from django.urls import path, re_path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('videos', views.API_Video_View)

app_name = 'video'
urlpatterns = [
    path('api/', include(router.urls)),
]
