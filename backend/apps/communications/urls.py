"""Urls for Communications App."""

from django.urls import path
from django.urls.resolvers import URLPattern

from .views import SupportView, FeedbackView


urlpatterns: list[URLPattern] = [
    path(
        "api/support",
        SupportView.as_view(),
    ),
    path(
        "api/feedback",
        FeedbackView.as_view(),
    ),
]
