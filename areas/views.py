from django.shortcuts import render, get_object_or_404
from django.views.generic.detail import DetailView
from django.http import HttpResponse
from django.template import loader
from areas.models import *

# Create your views here.
def index(request):
    state_list = State.objects.all()

    template = 'areas/index.html'

    context = {'state_list':state_list}

    return render(request, template, context)

def state_view(request, slug):
    state = get_object_or_404(State, slug=slug)

    area_list = Area.objects.all()
    city_list = City_Town.objects.all()
    boulder_list = Boulder_Wall.objects.all()

    template = 'areas/state.html'

    context = {'state':state, 'area_list':area_list, 'city_list':city_list, 'boulder_list':boulder_list}

    return render(request, template, context)
