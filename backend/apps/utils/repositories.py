"""Managers for Utilities App."""

from django.db import models


class BaseRepository(models.Manager):
    """Base Repository."""

    def get_available(self):
        return self.filter(is_available=True)

    def get_unavailable(self):
        return self.filter(is_available=False)
