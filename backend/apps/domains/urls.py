"""Urls for Domains App."""

from django.urls import path
from django.urls.resolvers import URLPattern

from .views import DomainListView, DomainDetailView


urlpatterns: list[URLPattern] = [
    path(
        "api/domains",
        DomainListView.as_view(),
    ),
    path(
        "api/domains/<str:domain_id>",
        DomainDetailView.as_view(),
    ),
]
