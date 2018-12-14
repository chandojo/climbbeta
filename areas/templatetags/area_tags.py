import datetime

from django import template
from ..models import *

register = template.Library()

@register.simple_tag(takes_context=True)
def current_time(context, format_string):
    timezone = context['city']
    return datetime.datetime.now().strftime(format_string)
