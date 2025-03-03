"""
URL configuration for core project.
"""

from django.contrib import admin
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
    path("", include("apps.urls.urls")),
    path("", include("apps.communications.urls")),
    path("", include("apps.users.routers")),
]
