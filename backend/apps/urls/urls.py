"""Urls for Urls App."""

from django.urls import path
from django.urls.resolvers import URLPattern

from .views import (
    URLListView,
    URLCreateView,
    URLRedirectView,
    URLDeleteView,
    URLStatsView,
    URLGroupListCreateView,
    URLGroupDetailView,
    VerifyPasswordView,
    ClickListView,
    ClicksSummaryView,
)


urlpatterns: list[URLPattern] = [
    path(
        "api/urls",
        URLListView.as_view(),
    ),
    path(
        "<str:alias>",
        URLRedirectView.as_view(),
    ),
    path(
        "verify-password/<str:alias>",
        VerifyPasswordView.as_view(),
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
    path(
        "api/groups",
        URLGroupListCreateView.as_view(),
    ),
    path(
        "api/groups/<str:group_id>",
        URLGroupDetailView.as_view(),
    ),
    path(
        "api/clicks",
        ClickListView.as_view(),
    ),
    path(
        "api/clicks/summary",
        ClicksSummaryView.as_view(),
    ),
]
