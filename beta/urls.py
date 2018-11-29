from django.urls import path

from . import views

app_name = 'beta'

urlpatterns = [
    path('', views.index, name='index'),
    path('results/', views.search, name='search'),
]
