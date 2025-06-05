"""Views for Support App."""

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from drf_spectacular.utils import extend_schema_view

from .serializers import NotificationSerializer
from .services import NotificationService, DonationService
from .schemas import support_schema, feedback_schema, kofi_webhook_schema


class BaseNotifierView(APIView):
    permission_classes: list = [AllowAny]
    webhook_key: str
    success_message: str
    category: str

    def post(self, request) -> Response:
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            if isinstance(serializer.validated_data, dict):
                NotificationService(self.webhook_key).send_notification(
                    serializer.validated_data,
                    self.category,
                )
            return Response(
                {"message": self.success_message},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema_view(**support_schema)
class SupportView(BaseNotifierView):
    """
    View to send support messages.

    Endpoints:
    - GET /api/support
    """

    webhook_key = "support"
    success_message = "Support sent"
    category = "support"


@extend_schema_view(**feedback_schema)
class FeedbackView(BaseNotifierView):
    """
    View to send feedback messages.

    Endpoints:
    - GET /api/feedback
    """

    webhook_key = "feedback"
    success_message = "Feedback sent"
    category = "feedback"


@extend_schema_view(**kofi_webhook_schema)
class KoFiWebhookView(APIView):
    """
    View to handle Ko-Fi webhooks.

    Endpoints:
    - POST /api/donate/kofi
    """

    permission_classes: list = [AllowAny]
    webhook_key: str = "donation"
    category: str = "donation"

    def post(self, request) -> Response:
        service = DonationService(request.data)

        try:
            parsed_data: dict = service.parse_data()
            service.validate_webhook(parsed_data)
            service.process_donation(
                parsed_data,
                self.webhook_key,
                self.category,
            )

        except ValidationError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"detail": "Webhook received"},
            status=status.HTTP_200_OK,
        )
