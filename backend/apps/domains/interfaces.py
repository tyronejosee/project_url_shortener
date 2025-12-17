"""Interfaces for Domains App."""

from django.contrib.auth import get_user_model
from django.db.models import QuerySet

from apps.domains.models import Domain

User = get_user_model()


class DomainRepositoryInterface:
    """Interface for Domain repository."""

    def get_by_id(self, domain_id: str) -> Domain | None: ...

    def get_by_user(self, user: User) -> QuerySet[Domain]: ...

    def create(self, user: User, **validated_data) -> Domain: ...

    def update(self, domain: Domain, **validated_data) -> Domain: ...

    def delete(self, domain: Domain) -> None: ...

    def exists(self, domain_id: str) -> bool: ...
