from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from areas.views import index

urlpatterns = [
    path('', index, name='index'),
    path('areas/', include('areas.urls')),
    path('climbs/', include('climbs.urls')),
    path('members/', include('members.urls')),
    path('videos/', include('video.urls')),
    path('react/', include('frontend.urls')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    #    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
