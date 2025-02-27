"""Views for Support App."""

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import NotificationSerializer
from .services import NotificationService


class BaseNotifierView(APIView):
    permission_classes: list = [AllowAny]
    webhook_key: str
    success_message: str

    def post(self, request) -> Response:
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            if isinstance(serializer.validated_data, dict):
                NotificationService(self.webhook_key).send_notification(
                    serializer.validated_data,
                )
            return Response(
                {"message": self.success_message},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SupportView(BaseNotifierView):
    """
    View to send support messages.

    Endpoints:
    - GET /api/support
    """

    webhook_key = "support"
    success_message = "Support sent"


class FeedbackView(BaseNotifierView):
    """
    View to send feedback messages.

    Endpoints:
    - GET /api/feedback
    """

    webhook_key = "feedback"
    success_message = "Feedback sent"
