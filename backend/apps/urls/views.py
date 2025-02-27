"""Views for Urls App."""

from django.http import HttpResponsePermanentRedirect, HttpResponseRedirect
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from user_agents import parse

from apps.users.services import UserService
from .models import URL, Click
from .serializers import URLSerializer, URLStatsSerializer

User = get_user_model()


class URLCreateView(APIView):
    """
    View to create a shortened URL.

    Endpoints:
    - POST /api/urls/shorten
    """

    permission_classes: list = [AllowAny]

    def post(self, request, *args, **kwargs) -> Response:
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
        self,
        request,
        alias,
        *args,
        **kwargs,
    ) -> Response | HttpResponseRedirect | HttpResponsePermanentRedirect:
        try:
            alias = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            return Response(
                {"error": "Short URL not found."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # TODO: Add service layer
        # ip_address = request.META.get("REMOTE_ADDR", "0.0.0.0")
        # user_agent_string = request.META.get("HTTP_USER_AGENT", "")
        # user_agent = parse(user_agent_string)

        # browser = user_agent.browser.family
        # os = user_agent.os.family

        # if user_agent.is_mobile:
        #     device = "Mobile"
        # elif user_agent.is_tablet:
        #     device = "Tablet"
        # elif user_agent.is_pc:
        #     device = "PC"
        # elif user_agent.is_bot:
        #     device = "Bot"
        # else:
        #     device = "Unknown"

        # Click.objects.create(
        #     url=alias,
        #     ip_address=ip_address,
        #     country=country,
        #     browser=browser,
        #     os=os,
        #     device=device,
        # )
        return redirect(alias.url)


class URLDeleteView(APIView):
    """
    View to delete a shortened URL.

    Endpoints:
    - DELETE /api/urls/{alias}
    """

    def delete(self, request, alias, *args, **kwargs) -> Response:
        try:
            alias = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            raise NotFound("Short URL not found.")
        alias.delete()
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

    def get(self, request, alias, *args, **kwargs) -> Response:
        try:
            alias = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            raise NotFound("Alias not found.")

        serializer = URLStatsSerializer(alias)
        return Response(serializer.data)
