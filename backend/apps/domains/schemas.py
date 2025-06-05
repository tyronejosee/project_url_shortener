"""Schemas for Domains App."""

from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
)

from .serializers import (
    DomainReadSerializer,
    DomainWriteSerializer,
)


domain_list_schema: dict = {
    "get": extend_schema(
        operation_id="list_domains",
        summary="Retrieve a list of Domains.",
        description=(
            "This endpoint returns all domains associated "
            "with the authenticated user. "
            "Access is restricted based on the user's subscription plan."
        ),
        responses={
            200: OpenApiResponse(
                DomainReadSerializer(many=True),
                description="List of domains.",
            ),
            403: OpenApiResponse(
                description="Access denied due to insufficient permissions."
            ),
        },
        tags=["domains"],
    ),
    "post": extend_schema(
        summary="Create a new domain.",
        description=(
            "This endpoint allows users to create a new domain. "
            "The domain will be associated with the authenticated user."
        ),
        request=DomainWriteSerializer,
        responses={
            201: OpenApiResponse(
                DomainWriteSerializer,
                description="Domain successfully created.",
            ),
            400: OpenApiResponse(
                description="Invalid request. Please check the submitted data."
            ),
            403: OpenApiResponse(
                description="Access denied due to insufficient permissions."
            ),
        },
        tags=["domains"],
    ),
}

domain_detail_schema: dict = {
    "patch": extend_schema(
        summary="Update a domain.",
        description=(
            "This endpoint allows users to update the details "
            "of a specific domain. Only partial updates are allowed. "
            "If the domain does not exist, a 404 error is returned."
        ),
        request=DomainWriteSerializer,
        responses={
            200: OpenApiResponse(
                DomainWriteSerializer,
                description="Domain successfully updated.",
            ),
            400: OpenApiResponse(
                description="Invalid request. Please check the submitted data."
            ),
            404: OpenApiResponse(
                description="Domain not found.",
            ),
        },
        tags=["domains"],
    ),
    "delete": extend_schema(
        summary="Delete a domain.",
        description=(
            "This endpoint allows users to delete a specific domain. "
            "If the domain does not exist, a 404 error is returned."
        ),
        responses={
            204: OpenApiResponse(
                description="Domain successfully deleted.",
            ),
            404: OpenApiResponse(
                description="Domain not found.",
            ),
        },
        tags=["domains"],
    ),
}
