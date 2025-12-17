"""Urls for Domains App."""

from django.urls import path
from django.urls.resolvers import URLPattern

from apps.domains.controllers import DomainDetailController, DomainListController

urlpatterns: list[URLPattern] = [
    path("api/domains", DomainListController.as_view()),
    path("api/domains/<uuid:domain_id>", DomainDetailController.as_view()),
]
