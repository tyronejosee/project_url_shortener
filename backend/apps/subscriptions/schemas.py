"""Schemas for Subscriptions App."""

from drf_spectacular.utils import extend_schema, OpenApiResponse


plan_list_schema: dict = {
    "get": extend_schema(
        summary="Retrieve the list of available plans.",
        description=(
            "This endpoint returns a list of available plans along with their features. "
            "If no plans are available, it returns a 404 error."
        ),
        responses={
            200: OpenApiResponse(
                description="Successful response with the list of available plans."
            ),
            404: OpenApiResponse(description="No plans available."),
        },
        auth=[],
        tags=["plans"],
    ),
}

leemon_squeezey_webhook_schema: dict = {
    "post": extend_schema(
        summary="Handle Lemon Squeezy webhooks.",
        description=(
            "This endpoint handles Lemon Squeezy webhooks. "
            "It verifies the signature of the payload using "
            "the secret key and dispatches the event "
            "to the appropriate handler."
        ),
        responses={
            200: OpenApiResponse(description="Event dispatched successfully."),
            400: OpenApiResponse(description="Invalid payload or missing event_name."),
            403: OpenApiResponse(description="Invalid signature in payload."),
            500: OpenApiResponse(description="Internal error."),
        },
        auth=[],
        tags=["plans"],
    ),
}
