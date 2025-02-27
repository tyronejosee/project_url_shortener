"""Urls for Urls App."""

from django.urls import path
from django.urls.resolvers import URLPattern

from .views import URLCreateView, URLRedirectView, URLDeleteView, URLStatsView


urlpatterns: list[URLPattern] = [
    path(
        "<str:alias>",
        URLRedirectView.as_view(),
    ),
    path(
        "api/urls/shorten",
        URLCreateView.as_view(),
    ),
    path(
        "api/urls/<str:alias>",
        URLDeleteView.as_view(),
    ),
    path(
        "api/urls/<str:alias>/stats",
        URLStatsView.as_view(),
    ),
]
