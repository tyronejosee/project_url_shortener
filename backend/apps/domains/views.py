"""Views for Domains App."""

from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from apps.users.permissions import IsPremium
from .models import Domain
from .serializers import DomainReadSerializer, DomainWriteSerializer


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
