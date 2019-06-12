from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static

#from areas.views import index
from frontend.views import index
from django.views.generic.base import TemplateView

urlpatterns = [
    path('areas/', include('areas.urls')),
    path('video/', include('video.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('', TemplateView.as_view(template_name="frontend/index.html"), name='index'),
    re_path('^.*/$', TemplateView.as_view(template_name="frontend/index.html"), name='index')
]

if settings.DEBUG:
    #    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
