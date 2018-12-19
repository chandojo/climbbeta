import json

from django import template
from django.utils.safestring import mark_safe
from ..models import *


register = template.Library()

@register.filter
def state_filter(value):
    city = City_Town.objects.filter(state__name=value)
    return city

@register.filter
def area_filter(value):
    area = Area.objects.filter(city_town__name=value)
    return  area

@register.filter(is_safe=True)
def js(obj):
    return mark_safe(json.dumps(obj))
