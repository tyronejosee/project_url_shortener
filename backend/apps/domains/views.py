"""Views for Domains App."""

from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema_view

from apps.users.permissions import IsPremium
from .models import Domain
from .serializers import DomainReadSerializer, DomainWriteSerializer
from .schemas import (
    domain_list_schema,
    domain_detail_schema,
)


@extend_schema_view(**domain_list_schema)
class DomainListView(APIView):
    """
    View to retrieve the list of domains belonging to the auth user.

    Endpoints:
    - GET /api/domains
    - POST /api/domains
    """

    permission_classes: list = [IsPremium]

    def get(self, request: Request) -> Response:
        domains = Domain.objects.get_domains_by_user(request.user)
        if domains.exists():
            serializer = DomainReadSerializer(domains, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"detail": "No domains found."},
            status=status.HTTP_200_OK,
        )

    def post(self, request: Request) -> Response:
        serializer = DomainWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema_view(**domain_detail_schema)
class DomainDetailView(APIView):
    """
    View to update, and delete a specific domain.

    Endpoints:
    - PATCH /api/domains/{id}
    - DELETE /api/domains/{id}
    """

    def get_object(self, pk: str) -> Domain:
        return get_object_or_404(Domain, pk=pk)

    def patch(self, request: Request, domain_id: str) -> Response:
        domain = self.get_object(domain_id)
        serializer = DomainWriteSerializer(
            domain,
            data=request.data,
            partial=True,
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, domain_id: str) -> Response:
        domain = self.get_object(domain_id)
        domain.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
