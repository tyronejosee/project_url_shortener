"""Schemas for Plans App."""

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
                description="Successful response with the list of available plans.",
            ),
            404: OpenApiResponse(
                description="No plans available.",
            ),
        },
        auth=[],
        tags=["plans"],
    ),
}
