"""Repositories for Domains App."""

from django.db.models.query import QuerySet

from apps.users.models import User
from apps.utils.repositories import BaseRepository


class DomainRepository(BaseRepository):
    """Repository for Domain model."""

    def get_domains_by_user(self, user: User) -> QuerySet:
        return self.get_available().filter(user=user).order_by("-created_at")
