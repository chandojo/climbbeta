from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from areas.views import index

urlpatterns = [
    path('', index, name='index'),
    path('areas/', include('areas.urls')),
    path('video/', include('video.urls')),
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    #    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
