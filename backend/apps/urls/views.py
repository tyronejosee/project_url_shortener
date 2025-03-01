"""Views for Urls App."""

from django.http import HttpResponsePermanentRedirect, HttpResponseRedirect, Http404
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny

from apps.users.services import UserService
from apps.users.permissions import IsFree, IsBasic, IsPremium
from .models import URL, URLGroup
from .services import URLService
from .serializers import (
    URLSerializer,
    URLStatsSerializer,
    URLGroupReadSerializer,
    URLGroupWriteSerializer,
)
from icecream import ic

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

    permission_classes: list = [IsFree | IsBasic | IsPremium]

    def get(self, request: Request, alias: str) -> Response:
        try:
            url_instance = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            raise NotFound("Alias not found.")

        serializer = URLStatsSerializer(url_instance)
        return Response(serializer.data)


class URLGroupListCreateView(APIView):
    """
    Pending.

    Endpoints:
    - GET /api/groups
    """

    permission_classes: list = [IsFree | IsBasic | IsPremium]

    def get(self, request: Request) -> Response:
        groups = URLGroup.objects.filter(user=request.user)
        serializer = URLGroupReadSerializer(groups, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = URLGroupWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class URLGroupDetailView(APIView):
    """
    Pending.

    Endpoints:
    - GET /api/groups/{id}
    """

    def get_object(self, group_id: str) -> URLGroup:
        try:
            return URLGroup.objects.get(pk=group_id)
        except URLGroup.DoesNotExist:
            raise Http404

    def get(self, request: Request, group_id: str) -> Response:
        group = self.get_object(group_id)
        serializer = URLGroupReadSerializer(group)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, group_id: str) -> Response:
        group = self.get_object(group_id)
        serializer = URLGroupWriteSerializer(
            group,
            data=request.data,
            partial=True,
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, group_id: str) -> Response:
        group = self.get_object(group_id)
        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
