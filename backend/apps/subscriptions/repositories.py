"""Repositories for Suscriptions App."""

from django.db.models import QuerySet

from apps.subscriptions.models import Plan


class PlanRepository:
    """
    Repository for Domain model operations.
    """

    def get_plans_by_order(self) -> QuerySet[Plan]:
        return Plan.objects.filter(is_available=True).order_by("order")
