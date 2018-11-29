from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy

from .forms import *
from .models import Member



# Create your views here.
def index(request):
    members = Member.objects.all()
    return render(request, 'members/index.html', {'members':members})

class Signup(CreateView):
    form_class = SignupForm
    template_name = 'members/signup.html'
    success_url = reverse_lazy('members:login')
