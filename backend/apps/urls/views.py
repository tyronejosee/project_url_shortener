"""Views for Urls App."""

from django.conf import settings
from django.shortcuts import redirect
from django.contrib.gis.geoip2 import GeoIP2
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound

from apps.utils.helpers import generate_email, generate_username
from .models import URL, Click
from .serializers import URLSerializer, URLStatsSerializer

User = settings.AUTH_USER_MODEL


class URLCreateView(APIView):
    """
    View to create a shortened URL.

    Endpoints:
    - POST /api/urls/shorten
    """

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            user_ip = None
        else:
            user = None
            user_ip = request.META.get("REMOTE_ADDR")
            user = User.objects.get_or_create(
                email=generate_email(),
                username=generate_username(),
                ip_address=user_ip,
            )

        serializer = URLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class URLRedirectView(APIView):
    """
    View to handle redirection from a shortened URL.

    Endpoints:
    - GET /{short_url}
    """

    def get(self, request, short_url, *args, **kwargs):
        try:
            short_url = URL.objects.get(short_url=short_url)
        except URL.DoesNotExist:
            return Response(
                {"error": "Short URL not found."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ip_address = request.META.get("REMOTE_ADDR", "0.0.0.0")
        country = "Unknown"
        try:
            geo = GeoIP2()
            country = geo.country(ip_address)["country_code"]
        except Exception:
            pass

        Click.objects.create(
            url_id=short_url,
            ip_address=ip_address,
            country=country,
        )
        short_url.click_count += 1
        short_url.save()
        return redirect(short_url.original_url)


class URLDeleteView(APIView):
    """
    View to delete a shortened URL.

    Endpoints:
    - DELETE /api/urls/{short_url}
    """

    def delete(self, request, short_url, *args, **kwargs):
        try:
            short_url = URL.objects.get(short_url=short_url)
        except URL.DoesNotExist:
            raise NotFound("Short URL not found.")
        short_url.delete()
        return Response(
            {"message": "URL deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )


class URLStatsView(APIView):
    """
    View to retrieve statistics for a shortened URL.

    Endpoints:
    - GET /api/urls/{short_url}/stats
    """

    def get(self, request, short_url, *args, **kwargs):
        try:
            short_url = URL.objects.get(short_url=short_url)
        except URL.DoesNotExist:
            raise NotFound("Short URL not found.")

        serializer = URLStatsSerializer(short_url)
        return Response(serializer.data)
