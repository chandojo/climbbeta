from django.contrib.auth import views as auth_views
from django.urls import path

from . import views

app_name = 'members'
urlpatterns = [
#    path('', views.index, name='index'),
    path('', auth_views.LoginView.as_view(template_name='members/login.html'), name='login'),
    path('loggedout/', auth_views.LogoutView.as_view(template_name='members/loggedout.html'), name='loggedout'),
    path('signup/', views.Signup.as_view(), name='signup')
]
