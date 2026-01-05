"""Views for Plans App."""

import logging

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema_view

from apps.subscriptions.bootstrap import get_plans_service, get_process_webhook_service
from apps.subscriptions.exceptions import InvalidPayloadError, InvalidSignatureError
from apps.subscriptions.schemas import leemon_squeezey_webhook_schema, plan_list_schema
from apps.subscriptions.serializers import PlanSerializer
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

    def get(self, request: Request, *args, **kwargs) -> Response:
        plans = get_plans_service().execute()
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
        service = get_process_webhook_service(
            raw_body=request.body,
            signature=request.headers.get("X-Signature"),
            payload=request.data,  # type: ignore
        )

        try:
            service.execute()
            return Response(
                {"detail": "Event dispatched successfully"},
                status=status.HTTP_200_OK,
            )

        except InvalidSignatureError as e:
            logger.warning(str(e))
            return Response(
                {"detail": str(e)},
                status=status.HTTP_403_FORBIDDEN,
            )

        except InvalidPayloadError as e:
            logger.error(str(e))
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Exception:
            logger.exception("Unhandled Lemon Squeezy webhook error")
            return Response(
                {"detail": "Internal error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
