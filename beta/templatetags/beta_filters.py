from django import template

from areas.models import Area
from ..models import Beta_Video

register = template.Library()

@register.filter
def title_filter(value):
    title_videos = Beta_Video.objects.filter(area__name=value)
    return title_videos
