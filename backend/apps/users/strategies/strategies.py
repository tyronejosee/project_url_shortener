from .base import PlanStrategy


class FreePlanStrategy(PlanStrategy):
    """
    Strategy for Free plan, defining the allowed functionalities.
    """

    def can_create_links(self) -> bool:
        return True

    def can_set_lifespan(self) -> bool:
        return True

    def can_access_analytics(self) -> bool:
        return True

    def can_use_password_protection(self) -> bool:
        return False  # True

    def can_use_privacy_settings(self) -> bool:
        return True

    def can_use_qr_code(self) -> bool:
        return False

    def can_use_custom_alias(self) -> bool:
        return False

    def can_use_custom_domain(self) -> bool:
        return False

    def can_use_link_groups(self) -> bool:
        return False

    def can_use_link_metadata(self) -> bool:
        return False

    def can_edit_url(self) -> bool:
        return False

    def get_link_lifespan(self) -> int:
        return 30

    def get_max_links_per_month(self) -> int:
        return 250


class BasicPlanStrategy(PlanStrategy):
    """
    Strategy for Basic plan, defining the allowed functionalities.
    """

    def can_create_links(self) -> bool:
        return True

    def can_set_lifespan(self) -> bool:
        return True

    def can_access_analytics(self) -> bool:
        return True

    def can_use_password_protection(self) -> bool:
        return True

    def can_use_privacy_settings(self) -> bool:
        return True

    def can_use_qr_code(self) -> bool:
        return True

    def can_use_custom_alias(self) -> bool:
        return True

    def can_use_custom_domain(self) -> bool:
        return True

    def can_use_link_groups(self) -> bool:
        return True

    def can_use_link_metadata(self) -> bool:
        return True

    def can_edit_url(self) -> bool:
        return True

    def get_link_lifespan(self) -> int:
        return 365

    def get_max_links_per_month(self) -> int:
        return 999999


class PremiumPlanStrategy(PlanStrategy):
    """
    Strategy for Premium plan, defining the allowed functionalities.
    """

    def can_create_links(self) -> bool:
        return True

    def can_set_lifespan(self) -> bool:
        return True

    def can_access_analytics(self) -> bool:
        return True

    def can_use_password_protection(self) -> bool:
        return True

    def can_use_privacy_settings(self) -> bool:
        return True

    def can_use_qr_code(self) -> bool:
        return True

    def can_use_custom_alias(self) -> bool:
        return True

    def can_use_custom_domain(self) -> bool:
        return True

    def can_use_link_groups(self) -> bool:
        return True

    def can_use_link_metadata(self) -> bool:
        return True

    def can_edit_url(self) -> bool:
        return True

    def get_link_lifespan(self) -> int:
        return 1095

    def get_max_links_per_month(self) -> int:
        return 999999
