import json
import datetime
import pytz

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

@register.filter
def utc_converter(value):
    ts = int(value)
    converted = datetime.datetime.utcfromtimestamp(ts).strftime('%d %b %Y %H:%M')
    return converted
