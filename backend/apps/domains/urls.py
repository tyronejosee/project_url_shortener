"""Urls for Domains App."""

from django.urls import path
from django.urls.resolvers import URLPattern

from .views import DomainListView


urlpatterns: list[URLPattern] = [
    path(
        "api/domains",
        DomainListView.as_view(),
    ),
]
