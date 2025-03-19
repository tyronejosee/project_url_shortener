from .base import PlanStrategy
from .strategies import (
    FreePlanStrategy,
    BasicPlanStrategy,
    PremiumPlanStrategy,
)


class PlanContext:
    """
    Class that manages a user's plan strategy
    and delegates functionality according to the plan type.
    """

    def __init__(self, user) -> None:
        self.strategy: PlanStrategy = self._get_plan_strategy(user.plan)

    def _get_plan_strategy(self, plan_name: str) -> PlanStrategy:
        strategies = {
            "free": FreePlanStrategy(),
            "basic": BasicPlanStrategy(),
            "premium": PremiumPlanStrategy(),
        }
        return strategies.get(plan_name, FreePlanStrategy())

    def can_create_links(self) -> bool:
        return self.strategy.can_create_links()

    def can_set_lifespan(self) -> bool:
        return self.strategy.can_set_lifespan()

    def can_access_analytics(self) -> bool:
        return self.strategy.can_access_analytics()

    def can_use_password_protection(self) -> bool:
        return self.strategy.can_use_password_protection()

    def can_use_privacy_settings(self) -> bool:
        return self.strategy.can_use_privacy_settings()

    def can_use_qr_code(self) -> bool:
        return self.strategy.can_use_qr_code()

    def can_use_custom_alias(self) -> bool:
        return self.strategy.can_use_custom_alias()

    def can_use_custom_domain(self) -> bool:
        return self.strategy.can_use_custom_domain()

    def can_use_link_groups(self) -> bool:
        return self.strategy.can_use_link_groups()

    def can_use_link_metadata(self) -> bool:
        return self.strategy.can_use_link_metadata()

    def can_edit_url(self) -> bool:
        return self.strategy.can_edit_url()

    def get_link_lifespan(self) -> int:
        return self.strategy.get_link_lifespan()

    def get_max_links_per_month(self) -> int:
        return self.strategy.get_max_links_per_month()
