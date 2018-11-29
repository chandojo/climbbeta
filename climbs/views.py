from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy

from climbs.models import Problem


def index(request):
    problem_list = Problem.objects.all()
    template=loader.get_template('climbs/index.html')
    context = {'problem_list':problem_list}
    return HttpResponse(template.render(context,request))

class ProblemCreate(CreateView):
    model = Problem
    fields = ['problem_name', 'description', 'grade', 'location', 'stars']
    success_url = reverse_lazy('climbs:index')

def error_404(request):
    data = {}
    return redner(request, '404.html', data)
