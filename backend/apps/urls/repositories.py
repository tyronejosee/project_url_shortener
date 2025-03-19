"""Repositories for Urls App."""

from django.db import models
from django.db.models.query import QuerySet
from django.utils import timezone

from apps.users.models import User
from apps.utils.repositories import BaseRepository


class URLRepository(models.Manager):
    """Repository for URL model."""

    def get_available(self) -> QuerySet:
        return self.filter(is_available=True)

    def get_urls_by_user(self, user: User) -> QuerySet:
        return (
            self.get_available()
            .filter(
                user=user,
            )
            .prefetch_related("clicks")
        )

    def count_links_this_month(self, user) -> int:
        current_date = timezone.now()
        return self.filter(
            user=user,
            created_at__year=current_date.year,
            created_at__month=current_date.month,
        ).count()


class URLGroupRepository(BaseRepository):
    """Repository for Group model."""


class ClickRepository(models.Manager):
    """Repository for Click model."""

    def get_available(self) -> QuerySet:
        return self.filter(is_available=True)

    def get_clicks_by_urls(self, urls: QuerySet) -> QuerySet:
        return self.get_available().filter(url__in=urls)
