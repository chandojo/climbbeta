from django.contrib.admin.views.decorators import staff_member_required
from django.urls import path

from . import views

app_name = 'climbs'
urlpatterns = [
    path('', views.index, name='index'),
    path('problem-create', staff_member_required(views.ProblemCreate.as_view(), login_url='members:login'), name='problem-create')
]

handler404 = views.error_404
