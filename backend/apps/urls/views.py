"""Views for Urls App."""

from django.http import HttpResponsePermanentRedirect, HttpResponseRedirect
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny

from apps.users.services import UserService
from .models import URL
from .services import URLService
from .serializers import URLSerializer, URLStatsSerializer

User = get_user_model()


class URLCreateView(APIView):
    """
    View to create a shortened URL.

    Endpoints:
    - POST /api/urls/shorten
    """

    permission_classes: list = [AllowAny]

    def post(self, request: Request) -> Response:
        user = UserService.get_or_create_user(request)
        serializer = URLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class URLRedirectView(APIView):
    """
    View to handle redirection from a shortened URL.

    Endpoints:
    - GET /{alias}
    """

    def get(
        self, request: Request, alias: str
    ) -> Response | HttpResponseRedirect | HttpResponsePermanentRedirect:
        try:
            url_instance = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            return Response(
                {"error": "Short URL not found."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        URLService.record_click(request, url_instance)
        return redirect(url_instance.url)


class URLDeleteView(APIView):
    """
    View to delete a shortened URL.

    Endpoints:
    - DELETE /api/urls/{alias}
    """

    def delete(self, request: Request, alias: str) -> Response:
        try:
            url_instance = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            raise NotFound("Short URL not found.")
        url_instance.delete()
        return Response(
            {"message": "URL deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )


class URLStatsView(APIView):
    """
    View to retrieve statistics for a shortened URL.

    Endpoints:
    - GET /api/urls/{alias}/stats
    """

    def get(self, request: Request, alias: str) -> Response:
        try:
            url_instance = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            raise NotFound("Alias not found.")

        serializer = URLStatsSerializer(url_instance)
        return Response(serializer.data)
