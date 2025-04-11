"""
URL configuration for core project.
"""

from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    # Admin urls
    path(
        "dashboard/",
        admin.site.urls,
    ),
    # Schemas urls
    path(
        "api/schema/swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Apps urls
    path("", include("apps.communications.urls")),
    path("", include("apps.domains.urls")),
    path("", include("apps.plans.urls")),
    path("", include("apps.urls.urls")),
    path("", include("apps.users.routers")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT,
    )

# Custom attributes for admin
admin.site.site_header = "URL Shortener"
admin.site.site_title = "URL Shortener"
admin.site.index_title = "Admin"
