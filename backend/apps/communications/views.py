"""Views for Support App."""

from django.conf import settings as cfg
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .observers.notifier import Notifier
from .observers.discord import DiscordNotifier


class SupportView(APIView):
    """
    View to send support messages.

    Endpoints:
    - GET /api/support
    """

    permission_classes: list = [AllowAny]

    def post(self, request) -> Response:
        notifier = Notifier()
        discord_observer = DiscordNotifier(cfg.DISCORD_WEBHOOKS["support"])
        notifier.attach(discord_observer)
        data: dict = {
            "name": request.data.get("name"),
            "email": request.data.get("email"),
            "message": request.data.get("message"),
        }
        notifier.notify_all(data)
        return Response(
            {"message": "Support sent"},
            status=status.HTTP_201_CREATED,
        )


class FeedbackView(APIView):
    """
    View to send feedback messages.

    Endpoints:
    - GET /api/support
    """

    permission_classes: list = [AllowAny]

    def post(self, request) -> Response:
        notifier = Notifier()
        discord_observer = DiscordNotifier(cfg.DISCORD_WEBHOOKS["feedback"])
        notifier.attach(discord_observer)
        data: dict = {
            "name": request.data.get("name"),
            "email": request.data.get("email"),
            "message": request.data.get("message"),
        }
        notifier.notify_all(data)
        return Response(
            {"message": "Feedback sent"},
            status=status.HTTP_201_CREATED,
        )
