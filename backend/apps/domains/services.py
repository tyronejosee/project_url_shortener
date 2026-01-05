"""Services for Domains App."""

from typing import Any
from uuid import UUID

from apps.domains.exceptions import DomainNotFound, DomainNotOwned
from apps.domains.models import Domain
from apps.domains.repositories import DomainRepository
from apps.users.models import User


class BaseDomainService:
    def __init__(self, domain_repository: DomainRepository) -> None:
        self.domain_repository = domain_repository

    def get_domain_or_fail(
        self,
        domain_id: UUID,
        *,
        user: User | None = None,
    ) -> Domain:
        domain = self.domain_repository.get_by_id(domain_id)

        if not domain:
            raise DomainNotFound("Domain not found.")

        if user and domain.user != user:
            raise DomainNotOwned("You don't have permission to access this domain.")

        return domain


class GetUserDomainsService:
    def __init__(self, domain_repository: DomainRepository) -> None:
        self.domain_repository = domain_repository

    def execute(self, user: User) -> list[Domain]:
        domains = self.domain_repository.get_by_user(user)
        return list(domains)


class GetDomainByIdService(BaseDomainService):
    def execute(self, domain_id: UUID) -> Domain:
        return self.get_domain_or_fail(domain_id)


class CreateDomainService:
    def __init__(self, domain_repository: DomainRepository) -> None:
        self.domain_repository = domain_repository

    def execute(self, user: User, validated_data: dict[str, Any]) -> Domain:
        return self.domain_repository.create(user=user, **validated_data)


class UpdateDomainService(BaseDomainService):
    def execute(
        self, domain_id: UUID, validated_data: dict[str, Any], user: User | None = None
    ) -> Domain:
        domain = self.get_domain_or_fail(domain_id, user=user)
        return self.domain_repository.update(domain, **validated_data)


class DeleteDomainService(BaseDomainService):
    def execute(self, domain_id: UUID, user: User | None = None) -> None:
        domain = self.get_domain_or_fail(domain_id, user=user)
        self.domain_repository.delete(domain)
