"""Routers for Users App."""

from django.urls import include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter

from .viewsets import UserExtensionViewSet
from .views import (
    TokenObtainPairExtensionView,
    TokenRefreshExtensionView,
    TokenVerifyExtensionView,
    ProviderAuthExtensionView,
)

router = DefaultRouter(trailing_slash="")
router.register(r"users", UserExtensionViewSet, basename="user")

urlpatterns = [
    # Routers urls
    path("api/", include(router.urls)),
    # Djoser socials urls
    re_path(
        r"^api/socials/o/(?P<provider>\S+)/$",
        ProviderAuthExtensionView.as_view(),
        name="provider-auth",
    ),
    # djangorestframework-simplejwt urls
    re_path(
        r"^api/tokens/create/?",
        TokenObtainPairExtensionView.as_view(),
        name="jwt-create",
    ),
    re_path(
        r"^api/tokens/refresh/?",
        TokenRefreshExtensionView.as_view(),
        name="jwt-refresh",
    ),
    re_path(
        r"^api/tokens/verify/?",
        TokenVerifyExtensionView.as_view(),
        name="jwt-verify",
    ),
]
