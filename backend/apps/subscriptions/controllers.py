"""Views for Plans App."""

import logging

from django.conf import settings
from drf_spectacular.utils import extend_schema_view
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.subscriptions.commands.dispatcher import EventDispatcher
from apps.subscriptions.schemas import leemon_squeezey_webhook_schema, plan_list_schema
from apps.subscriptions.serializers import PlanSerializer
from apps.subscriptions.services import PlanService
from apps.utils.helpers import verify_signature
from core.logging import setup_logging

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


@extend_schema_view(**plan_list_schema)
class PlanListController(APIView):
    """
    View to retrieve the list of plans with their features.

    Endpoints:
    - GET /api/plans
    """

    permission_classes: list = [AllowAny]

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.service = PlanService()

    def get(self, request: Request, *args, **kwargs) -> Response:
        plans = self.service.get_plans()
        return Response(
            PlanSerializer(plans, many=True).data, status=status.HTTP_200_OK
        )


@extend_schema_view(**leemon_squeezey_webhook_schema)
class LemonSqueezyWebhook(APIView):
    """
    View to handle Lemon Squeezy webhooks.

    Endpoints:
    - POST /api/webhooks/lemon-squeezy
    """

    permission_classes: list = [AllowAny]

    def post(self, request: Request, *args, **kwargs) -> Response:
        signature: str = request.headers.get("X-Signature")
        raw_body: bytes = request.body

        if not verify_signature(
            settings.LEMON_SQUEEZY_SECRET_KEY,
            raw_body,
            signature,
        ):
            logger.warning("Invalid webhook signature")
            return Response(
                {"detail": "Invalid signature in payload"},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            payload: dict = request.data  # type: ignore
            event_type: str = payload["meta"]["event_name"]

            if not event_type:
                logger.error("Webhook received without event_name")
                return Response(
                    {"detail": "Missing event_name in payload"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            logger.info(f"Received webhook event: {event_type}")
            processor = EventDispatcher(event_type, payload)
            processor.dispatch()
            return Response(
                {"detail": "Event dispatched successfully"},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            logger.exception(f"Error processing Lemon Squeezy webhook: {e}")
            return Response(
                {"detail": "Internal error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
