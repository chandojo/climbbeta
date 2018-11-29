from django.contrib import admin

from .models import *

admin.site.register(Rating)
admin.site.register(Grade)
admin.site.register(Problem)
admin.site.register(Sent)
