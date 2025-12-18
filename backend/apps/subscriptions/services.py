"""Services for Subscriptions App."""

from apps.subscriptions.models import Plan
from apps.subscriptions.repositories import PlanRepository


class PlanService:
    """
    Service layer for plan business logic.
    """

    def __init__(self) -> None:
        self.repository = PlanRepository()

    def get_plans(self) -> list[Plan]:
        """Get all plans."""
        plans = self.repository.get_plans_by_order()
        return list(plans)
