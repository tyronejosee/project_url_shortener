"""Urls for Urls App."""

from django.urls import path

from .views import URLCreateView, URLRedirectView


urlpatterns = [
    path(
        "shorten",
        URLCreateView.as_view(),
    ),
    path(
        "<str:short_url>",
        URLRedirectView.as_view(),
    ),
]
