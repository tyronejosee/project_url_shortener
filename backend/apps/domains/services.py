"""Services for Domains App."""

from typing import Any
from uuid import UUID

from rest_framework.exceptions import NotFound, ValidationError

from apps.domains.models import Domain
from apps.domains.repositories import DomainRepository
from apps.users.models import User


class DomainService:
    """Service layer for domain business logic."""

    def __init__(self) -> None:
        self.repository = DomainRepository()

    def get_user_domains(self, user: User) -> list[Domain]:
        """Get all domains for a user."""
        domains = self.repository.get_by_user(user)
        return list(domains)

    def get_domain_by_id(self, domain_id: UUID) -> Domain:
        """Get a single domain by ID."""
        domain = self.repository.get_by_id(domain_id)
        if not domain:
            raise NotFound(detail="Domain not found.")
        return domain

    def create_domain(self, user: User, validated_data: dict[str, Any]) -> Domain:
        """Create a new domain with business logic validation."""
        return self.repository.create(user=user, **validated_data)

    def update_domain(
        self,
        domain_id: UUID,
        validated_data: dict[str, Any],
        user: User | None = None,
    ) -> Domain:
        """Update an existing domain."""
        domain = self.get_domain_by_id(domain_id)
        if user and domain.user != user:
            raise ValidationError(
                detail="You don't have permission to update this domain."
            )

        return self.repository.update(domain, **validated_data)

    def delete_domain(self, domain_id: UUID, user: User | None = None) -> None:
        """Delete a domain."""
        domain = self.get_domain_by_id(domain_id)

        if user and domain.user != user:
            raise ValidationError(
                detail="You don't have permission to delete this domain."
            )

        self.repository.delete(domain)
