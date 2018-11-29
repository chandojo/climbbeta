from django import template

from ..models import *

register = template.Library()

@register.filter
def state_filter(value):
    city = City_Town.objects.filter(state__name=value)
    return city
