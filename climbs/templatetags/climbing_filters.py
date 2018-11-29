from django import template
from ..models import Grade, Problem

register = template.Library()

@register.filter
def grade_filter(value):
    grade_problems = Problem.objects.filter(grade=value)
    return grade_problems

@register.filter
def location_filter(value):
    location_problems = Problem.objects.filter(location=value)
    return location_problems
