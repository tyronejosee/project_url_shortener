"""
URL configuration for core project.
"""

from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("dashboard/", admin.site.urls),
    path("", include("apps.urls.urls")),
    path("", include("apps.communications.urls")),
    path("", include("apps.users.routers")),
]
