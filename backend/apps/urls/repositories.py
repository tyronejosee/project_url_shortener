"""Repositories for Urls App."""

from django.db import models
from django.db.models.query import QuerySet

from apps.users.models import User
from apps.utils.repositories import BaseRepository


class URLRepository(models.Manager):
    """Repository for URL model."""

    def get_available(self):
        return self.filter(is_available=True)

    def get_urls_by_user(self, user: User):
        return (
            self.get_available()
            .filter(
                user=user,
            )
            .prefetch_related("clicks")
        )


class URLGroupRepository(BaseRepository):
    """Repository for Group model."""


class ClickRepository(models.Manager):
    """Repository for Click model."""

    def get_available(self):
        return self.filter(is_available=True)

    def get_clicks_by_urls(self, urls: QuerySet):
        return self.get_available().filter(url__in=urls)
