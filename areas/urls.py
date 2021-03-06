from django.urls import path, re_path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('states', views.API_State_View)
router.register('cities', views.API_CityTown_View)

app_name = 'areas'
urlpatterns = [
    path('api/', include(router.urls)),
 ]
