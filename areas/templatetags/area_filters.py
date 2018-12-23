import json
import datetime
import pytz

from django import template
from django.utils.safestring import mark_safe
from ..models import *


register = template.Library()

@register.filter(is_safe=True)
def js(obj):
    return mark_safe(json.dumps(obj))

@register.filter
def day_converter(value):
    ts = str(value)
    converted = datetime.datetime.strptime(ts, '%Y-%m-%d').strftime('%d %b %Y')
    return converted

@register.filter
def time_converter(value):
    ts = str(value)
    time = ts[11:19]
    converted = datetime.datetime.strptime(time, '%H:%M:%S').strftime('%I:%M %p')
    return converted
