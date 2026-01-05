"""Controllers for Domains App."""

from typing import cast
from uuid import UUID

from drf_spectacular.utils import extend_schema_view
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.domains.bootstrap import (
    get_create_domain_service,
    get_delete_domain_service,
    get_update_domain_service,
    get_user_domains_service,
)
from apps.domains.schemas import domain_detail_schema, domain_list_schema
from apps.domains.serializers import DomainReadSerializer, DomainWriteSerializer
from apps.users.permissions import IsPremium


@extend_schema_view(**domain_list_schema)
class DomainListController(APIView):
    """
    Controller to retrieve the list of domains belonging to the auth user.

    Endpoints:
    - GET /api/domains
    - POST /api/domains
    """

    permission_classes: list = [IsPremium]

    def get(self, request: Request) -> Response:
        domains = get_user_domains_service().execute(request.user)
        return Response(
            DomainReadSerializer(domains, many=True).data, status=status.HTTP_200_OK
        )

    def post(self, request: Request) -> Response:
        serializer = DomainWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = cast("dict", serializer.validated_data)
        domain = get_create_domain_service().execute(
            user=request.user, validated_data=validated_data
        )
        return Response(
            DomainReadSerializer(domain).data, status=status.HTTP_201_CREATED
        )


@extend_schema_view(**domain_detail_schema)
class DomainDetailController(APIView):
    """
    Controller to update and delete a specific domain.

    Endpoints:
    - PATCH /api/domains/{id}
    - DELETE /api/domains/{id}
    """

    permission_classes: list = [IsPremium]

    def patch(self, request: Request, domain_id: UUID) -> Response:
        serializer = DomainWriteSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        validated_data = cast("dict", serializer.validated_data)
        domain = get_update_domain_service().execute(
            domain_id=domain_id, validated_data=validated_data, user=request.user
        )
        return Response(DomainReadSerializer(domain).data, status=status.HTTP_200_OK)

    def delete(self, request: Request, domain_id: UUID) -> Response:
        get_delete_domain_service().execute(domain_id=domain_id, user=request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)
