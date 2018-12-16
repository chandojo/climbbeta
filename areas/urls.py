from django.urls import path, re_path

from . import views

app_name = 'areas'
urlpatterns = [
    path('', views.index, name='index'),
    path('<slug:slug>/', views.State_View.as_view(), name='states'),
    path('<slug:state__slug>/<slug:slug>/', views.City_View.as_view(), name='cities'),
 ]
