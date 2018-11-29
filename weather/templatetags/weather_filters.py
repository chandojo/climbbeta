from django import template

register = template.Library()

@register.filter
def splitByThree(data):
    for i in range (0, len(data), 3):
        yield data[i:i+3]
