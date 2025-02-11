"""Urls for Urls App."""

from django.urls import path

from .views import URLCreateView, URLRedirectView, URLDeleteView, URLStatsView


urlpatterns = [
    path(
        "<str:short_url>",
        URLRedirectView.as_view(),
    ),
    path(
        "api/urls/shorten",
        URLCreateView.as_view(),
    ),
    path(
        "api/urls/<str:short_url>",
        URLDeleteView.as_view(),
    ),
    path(
        "api/urls/<str:short_url>/stats",
        URLStatsView.as_view(),
    ),
]
