"""Repositories for Plans App."""

from django.db.models import QuerySet

from apps.utils.repositories import BaseRepository


class PlanRepository(BaseRepository):
    """Repository for Plan model."""

    def get_plans_by_order(self) -> QuerySet:
        return self.get_queryset().order_by("order")
