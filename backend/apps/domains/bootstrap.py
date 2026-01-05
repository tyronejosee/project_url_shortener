from functools import lru_cache

from apps.domains.repositories import DomainRepository
from apps.domains.services import (
    CreateDomainService,
    DeleteDomainService,
    GetDomainByIdService,
    GetUserDomainsService,
    UpdateDomainService,
)


@lru_cache
def GetDomainRepository() -> DomainRepository:
    return DomainRepository()


def get_user_domains_service() -> GetUserDomainsService:
    return GetUserDomainsService(GetDomainRepository())


def get_domain_by_id_service() -> GetDomainByIdService:
    return GetDomainByIdService(GetDomainRepository())


def get_create_domain_service() -> CreateDomainService:
    return CreateDomainService(GetDomainRepository())


def get_update_domain_service() -> UpdateDomainService:
    return UpdateDomainService(GetDomainRepository())


def get_delete_domain_service() -> DeleteDomainService:
    return DeleteDomainService(GetDomainRepository())
