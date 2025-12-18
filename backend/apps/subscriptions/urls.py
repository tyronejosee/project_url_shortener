"""Urls for Suscriptions App."""

from django.urls import path
from django.urls.resolvers import URLPattern

from apps.subscriptions.controllers import PlanListController, LemonSqueezyWebhook

urlpatterns: list[URLPattern] = [
    path("api/plans", PlanListController.as_view()),
    path("api/webhooks/lemon-squeezy", LemonSqueezyWebhook.as_view()),
]
