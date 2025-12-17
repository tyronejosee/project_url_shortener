"""Repositories for Domains App."""

from typing import override

from django.contrib.auth import get_user_model
from django.db.models import QuerySet

from apps.domains.interfaces import DomainRepositoryInterface
from apps.domains.models import Domain

User = get_user_model()


class DomainRepository(DomainRepositoryInterface):
    """Repository for Domain model operations."""

    @override
    def get_by_id(self, domain_id: str) -> Domain | None:
        """Get a domain by its ID."""
        try:
            return Domain.objects.get(pk=domain_id)
        except Domain.DoesNotExist:
            return None

    @override
    def get_by_user(self, user: User) -> QuerySet[Domain]:
        """Get all domains belonging to a user."""
        return Domain.objects.filter(is_available=True, user=user).order_by(
            "-created_at"
        )

    @override
    def create(self, user: User, **validated_data) -> Domain:
        """Create a new domain."""
        return Domain.objects.create(user=user, **validated_data)

    @override
    def update(self, instance: Domain, **validated_data) -> Domain:
        """Update an existing domain."""
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance

    @override
    def delete(self, domain: Domain) -> None:
        """Delete a domain."""
        domain.delete()

    @override
    def exists(self, domain_id: str) -> bool:
        """Check if a domain exists."""
        return Domain.objects.filter(pk=domain_id).exists()
