from django.urls import path, re_path

from . import views

app_name = 'areas'
urlpatterns = [
    path('', views.index, name='index'),
    path('<slug:slug>/', views.state_view, name='states'),
    path('<slug:state__slug>/<slug:slug>/', views.city_view, name='cities')
]
