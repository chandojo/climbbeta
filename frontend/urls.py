from django.urls import path, re_path
from . import views

urlpatterns = [
#    re_path('^react/$',views.index )
    re_path('.*', views.index)
]
