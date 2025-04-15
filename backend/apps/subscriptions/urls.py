"""Urls for Plans App."""

from django.urls import path
from django.urls.resolvers import URLPattern

from .views import PlanListView, LemonSqueezyWebhookView


urlpatterns: list[URLPattern] = [
    path(
        "api/plans",
        PlanListView.as_view(),
    ),
    path(
        "api/webhooks/lemon-squeezy",
        LemonSqueezyWebhookView.as_view(),
    ),
]
