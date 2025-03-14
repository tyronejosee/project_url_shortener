"""Views for Users App."""

from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from djoser.social.views import ProviderAuthView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from drf_spectacular.utils import extend_schema_view

from .schemas import (
    provider_auth_schemas,
    token_obtain_pair_schemas,
    token_refresh_schemas,
    token_verify_schemas,
    logout_schema,
)


@extend_schema_view(**provider_auth_schemas)
class ProviderAuthExtensionView(ProviderAuthView):
    """
    Extended view for handling social authentication provider requests.

    Extends the standard ProviderAuthView `djoser.social.urls`
    to include custom schema documentation using drf-spectacular.
    """

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 201:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")

            response.set_cookie(
                "access",
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
            )
            response.set_cookie(
                "refresh",
                refresh_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
            )

        return response


@extend_schema_view(**token_obtain_pair_schemas)
class TokenObtainPairExtensionView(TokenObtainPairView):
    """
    Extended view for obtaining JWT tokens.

    Extends the standard TokenObtainPairView in
    `rest_framework_simplejwt.views` to include
    custom schema documentation using drf-spectacular.
    """

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")

            response.set_cookie(
                "access",
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
            )
            response.set_cookie(
                "refresh",
                refresh_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
            )

        return response


@extend_schema_view(**token_refresh_schemas)
class TokenRefreshExtensionView(TokenRefreshView):
    """
    Extended view for refreshing JWT tokens.

    Extends the standard TokenRefreshView in `rest_framework_simplejwt.views`
    to include custom schema documentation using drf-spectacular.
    """

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh")

        if refresh_token:
            request.data["refresh"] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get("access")

            response.set_cookie(
                "access",
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
            )

        return response


@extend_schema_view(**token_verify_schemas)
class TokenVerifyExtensionView(TokenVerifyView):
    """
    Extended view for verifying JWT tokens.

    Extends the standard TokenVerifyView in `rest_framework_simplejwt.views`
    to include custom schema documentation using drf-spectacular.
    """

    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get("access")
        if access_token:
            request.data["token"] = access_token
        return super().post(request, *args, **kwargs)


@extend_schema_view(**logout_schema)
class LogoutView(APIView):
    """
    View to handle user logout by deleting authentication cookies.
    """

    serializer_class = None

    def post(self, request, *args, **kwargs) -> Response:
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response
