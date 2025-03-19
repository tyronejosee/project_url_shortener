from abc import ABC, abstractmethod


class PlanStrategy(ABC):
    @abstractmethod
    def can_create_links(self) -> bool:
        pass

    @abstractmethod
    def can_set_lifespan(self) -> bool:
        pass

    @abstractmethod
    def can_access_analytics(self) -> bool:
        pass

    @abstractmethod
    def can_use_password_protection(self) -> bool:
        pass

    @abstractmethod
    def can_use_privacy_settings(self) -> bool:
        pass

    @abstractmethod
    def can_use_qr_code(self) -> bool:
        pass

    @abstractmethod
    def can_use_custom_alias(self) -> bool:
        pass

    @abstractmethod
    def can_use_custom_domain(self) -> bool:
        pass

    @abstractmethod
    def can_use_link_groups(self) -> bool:
        pass

    @abstractmethod
    def can_use_link_metadata(self) -> bool:
        pass

    @abstractmethod
    def can_edit_url(self) -> bool:
        pass

    @abstractmethod
    def get_link_lifespan(self) -> int:
        pass

    @abstractmethod
    def get_max_links_per_month(self) -> int:
        pass
