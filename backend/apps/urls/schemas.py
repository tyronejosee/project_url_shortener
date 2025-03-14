"""Schemas for Urls App."""

from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
    OpenApiTypes,
    OpenApiExample,
)

from .serializers import (
    URLSerializer,
    URLStatsSerializer,
    URLGroupReadSerializer,
    URLGroupWriteSerializer,
    ClickReadSerializer,
)

url_create_schema: dict = {
    "post": extend_schema(
        summary="Create a shortened URL.",
        description=(
            "This endpoint allows users to create a short link "
            "from a provided URL. The user can be automatically identified "
            "if included in the request."
        ),
        request=URLSerializer,
        responses={
            201: OpenApiResponse(URLSerializer, description="Created"),
            400: OpenApiResponse(description="Bad request"),
        },
        auth=[],
        tags=["urls"],
    ),
}

url_redirect_schema: dict = {
    "get": extend_schema(
        summary="Redirect to the original URL.",
        description=(
            "This endpoint handles redirection "
            "from a shortened URL to the original destination. "
            "If the alias does not exist, it returns a 400 error."
        ),
        responses={
            302: OpenApiResponse(
                description="Temporary redirect to the original URL.",
            ),
            301: OpenApiResponse(
                description="Permanent redirect to the original URL.",
            ),
            400: OpenApiResponse(
                description="Short URL not found.",
            ),
        },
        auth=[],
        tags=["urls"],
    ),
}

url_delete_schema: dict = {
    "delete": extend_schema(
        summary="Delete a shortened URL.",
        description=(
            "This endpoint allows users to delete a shortened URL "
            "by providing its alias. "
            "If the alias does not exist, a 404 error is returned."
        ),
        responses={
            204: OpenApiResponse(description="Not content"),
            404: OpenApiResponse(description="Not found"),
        },
        tags=["urls"],
    ),
}

url_stats_schema: dict = {
    "get": extend_schema(
        summary="Retrieve statistics for a shortened URL.",
        description=(
            "This endpoint provides analytics and statistics "
            "for a shortened URL, such as the number of clicks and "
            "other relevant data. "
            "Access is restricted based on the user's subscription plan."
        ),
        responses={
            200: OpenApiResponse(
                URLStatsSerializer,
                description="Statistics retrieved successfully.",
            ),
            404: OpenApiResponse(
                description="Alias not found.",
            ),
            403: OpenApiResponse(
                description="Access denied due to insufficient permissions."
            ),
        },
        tags=["urls"],
    ),
}

url_group_list_create_schema: dict = {
    "get": extend_schema(
        operation_id="list_url_groups",
        summary="Retrieve a list of URL groups.",
        description=(
            "This endpoint returns all URL groups associated "
            "with the authenticated user. "
            "Access is restricted based on the user's subscription plan."
        ),
        responses={
            200: OpenApiResponse(
                URLGroupReadSerializer(many=True),
                description="List of URL groups.",
            ),
            403: OpenApiResponse(
                description="Access denied due to insufficient permissions."
            ),
        },
        tags=["groups"],
    ),
    "post": extend_schema(
        summary="Create a new URL group.",
        description=(
            "This endpoint allows users to create a new URL group. "
            "The group will be associated with the authenticated user."
        ),
        request=URLGroupWriteSerializer,
        responses={
            201: OpenApiResponse(
                URLGroupWriteSerializer,
                description="URL group successfully created.",
            ),
            400: OpenApiResponse(
                description="Invalid request. Please check the submitted data."
            ),
            403: OpenApiResponse(
                description="Access denied due to insufficient permissions."
            ),
        },
        tags=["groups"],
    ),
}

url_group_detail_schema: dict = {
    "get": extend_schema(
        operation_id="retrieve_url_groups",
        summary="Retrieve details of a URL group.",
        description=(
            "This endpoint returns the details of a specific URL group "
            "based on its ID. If the group does not exist, "
            "a 404 error is returned."
        ),
        responses={
            200: OpenApiResponse(
                URLGroupReadSerializer,
                description="URL group details retrieved successfully.",
            ),
            404: OpenApiResponse(description="URL group not found."),
        },
        tags=["groups"],
    ),
    "patch": extend_schema(
        summary="Update a URL group.",
        description=(
            "This endpoint allows users to update the details "
            "of a specific URL group. Only partial updates are allowed. "
            "If the group does not exist, a 404 error is returned."
        ),
        request=URLGroupWriteSerializer,
        responses={
            200: OpenApiResponse(
                URLGroupWriteSerializer,
                description="URL group successfully updated.",
            ),
            400: OpenApiResponse(
                description="Invalid request. Please check the submitted data."
            ),
            404: OpenApiResponse(
                description="URL group not found.",
            ),
        },
        tags=["groups"],
    ),
    "delete": extend_schema(
        summary="Delete a URL group.",
        description=(
            "This endpoint allows users to delete a specific URL group. "
            "If the group does not exist, a 404 error is returned."
        ),
        responses={
            204: OpenApiResponse(
                description="URL group successfully deleted.",
            ),
            404: OpenApiResponse(
                description="URL group not found.",
            ),
        },
        tags=["groups"],
    ),
}

click_list_schema: dict = {
    "get": extend_schema(
        summary="Retrieve all clicks for the authenticated user's URLs.",
        description=(
            "This endpoint returns a list of clicks for all URLs "
            "belonging to the authenticated user. "
            "If no URLs are found for the user, it returns a 404 error. "
            "If URLs exist but have no clicks, it returns a 204 response."
        ),
        responses={
            200: OpenApiResponse(
                ClickReadSerializer(many=True),
                description="List of clicks retrieved successfully.",
            ),
            204: OpenApiResponse(
                description="No clicks found for the provided URLs.",
            ),
            404: OpenApiResponse(description="No URLs found for user."),
        },
        tags=["clicks"],
    ),
}

clicks_summary_schema: dict = {
    "get": extend_schema(
        summary="Retrieve a summary of clicks.",
        description=(
            "Returns aggregated data about clicks for the authenticated "
            "user's URLs, grouped by date, device, browser and os."
        ),
        responses={
            200: OpenApiResponse(
                response=OpenApiTypes.OBJECT,
                description="Click summary data retrieved successfully.",
                examples=[
                    OpenApiExample(
                        "Click Summary Example",
                        value={
                            "clicks": [
                                {"date": "0000-00-00", "clicks": 0},
                            ],
                            "device": [
                                {"name": "<type>", "value": 0},
                            ],
                            "browser": [
                                {"name": "<type>", "value": 0},
                            ],
                            "os": [
                                {"name": "<type>", "value": 0},
                            ],
                        },
                        response_only=True
                    )
                ],
            ),
        },
        tags=["clicks"],
    ),
}
