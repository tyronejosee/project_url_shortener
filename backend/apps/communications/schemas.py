"""Schemas for Urls App."""

from drf_spectacular.utils import extend_schema, OpenApiResponse

from .serializers import NotificationSerializer


support_schema: dict = {
    "post": extend_schema(
        summary="Send a support message.",
        description=(
            "This endpoint allows users to send a support message. "
            "The message will be processed and forwarded via a webhook."
        ),
        request=NotificationSerializer,
        responses={
            201: OpenApiResponse(
                NotificationSerializer,
                description="Support message sent successfully.",
            ),
            400: OpenApiResponse(
                description="Invalid request. Please check the submitted data."
            ),
        },
        auth=[],
        tags=["communications"],
    ),
}

feedback_schema: dict = {
    "post": extend_schema(
        summary="Send a feedback message.",
        description=(
            "This endpoint allows users to send feedback messages. "
            "The feedback will be processed and forwarded via a webhook."
        ),
        request=NotificationSerializer,
        responses={
            201: OpenApiResponse(
                NotificationSerializer,
                description="Feedback message sent successfully.",
            ),
            400: OpenApiResponse(
                description="Invalid request. Please check the submitted data."
            ),
        },
        auth=[],
        tags=["communications"],
    ),
}

kofi_webhook_schema: dict = {
    "post": extend_schema(
        summary="Handle Ko-Fi webhooks.",
        description=(
            "This endpoint handles Ko-Fi webhooks. "
            "It verifies the signature of the payload using "
            "the secret key and dispatches the event "
            "to the appropriate handler."
        ),
        responses={
            200: OpenApiResponse(
                description="Event dispatched successfully.",
            ),
            400: OpenApiResponse(
                description="Invalid payload or missing event_name.",
            ),
            403: OpenApiResponse(
                description="Invalid signature in payload.",
            ),
        },
        auth=[],
        tags=["communications"],
    ),
}
