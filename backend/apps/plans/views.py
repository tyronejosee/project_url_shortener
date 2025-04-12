"""Views for Plans App."""

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema_view

from .models import Plan
from .serializers import PlanSerializer
from .schemas import plan_list_schema


@extend_schema_view(**plan_list_schema)
class PlanListView(APIView):
    """
    View to retrieve the list of plans with their features.

    Endpoints:
    - GET /api/plans
    """

    permission_classes: list = [AllowAny]

    def get(self, request: Request, *args, **kwargs) -> Response:
        plans = Plan.objects.get_plans_by_order()
        if not plans.exists():
            return Response(
                {"detail": "No plans available."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = PlanSerializer(plans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
