"""Repositories for Domains App."""

from uuid import UUID

from django.db.models import QuerySet

from apps.domains.models import Domain
from apps.users.models import User


class DomainRepository:
    """Repository for Domain model operations."""

    def get_by_id(self, domain_id: UUID) -> Domain | None:
        try:
            return Domain.objects.get(pk=domain_id)
        except Domain.DoesNotExist:
            return None

    def get_by_user(self, user: User) -> QuerySet[Domain]:
        return Domain.objects.filter(is_available=True, user=user).order_by(
            "-created_at"
        )

    def create(self, user: User, **validated_data) -> Domain:
        return Domain.objects.create(user=user, **validated_data)

    def update(self, instance: Domain, **validated_data) -> Domain:
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance

    def delete(self, domain: Domain) -> None:
        domain.delete()

    def exists(self, domain_id: UUID) -> bool:
        return Domain.objects.filter(pk=domain_id).exists()
