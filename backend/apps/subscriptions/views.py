"""Views for Plans App."""

# import hmac
# import hashlib
import logging

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema_view

from core.logging import setup_logging
from .commands.dispatcher import EventDispatcher
from .models import Plan
from .serializers import PlanSerializer
from .schemas import plan_list_schema

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


@extend_schema_view(**plan_list_schema)
class PlanListView(APIView):
    """
    View to retrieve the list of plans with their features.

    Endpoints:
    - GET /api/plans
    """

    permission_classes: list = [AllowAny]

    def get(self, request: Request, *args, **kwargs) -> Response:
        plans = Plan.objects.get_plans_by_order()
        if not plans.exists():
            return Response(
                {"detail": "No plans available."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = PlanSerializer(plans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LemonSqueezyWebhookView(APIView):
    """
    View to handle Lemon Squeezy webhooks.

    Endpoints:
    - POST /api/webhooks/lemon-squeezy
    """

    permission_classes: list = [AllowAny]

    def post(self, request: Request, *args, **kwargs) -> Response:
        # signature = request.headers.get("X-Signature")
        # if not signature:
        #     logger.warning("Missing X-Signature header")
        #     return Response(
        #         {"detail": "Missing signature in header"},
        #         status=status.HTTP_400_BAD_REQUEST,
        #     )

        try:
            #     raw_body = request.body
            #     expected_signature = hmac.new(
            #         key=settings.LEMON_SECRET_KEY.encode(),
            #         msg=raw_body,
            #         digestmod=hashlib.sha256,
            #     ).hexdigest()

            #     if not hmac.compare_digest(expected_signature, signature):
            #         logger.warning("Invalid webhook signature")
            #         return Response(
            #             {"detail": "Invalid signature in payload"},
            #             status=status.HTTP_403_FORBIDDEN,
            #         )

            payload: dict = request.data
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
