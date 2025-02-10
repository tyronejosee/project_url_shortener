"""Models for Urls App."""

import random
import string

from django.db import models

from apps.utils.models import BaseModel


class URL(BaseModel):
    """
    Model definition for URL.
    """

    original_url = models.URLField(max_length=2000)
    short_url = models.CharField(max_length=10, blank=True, unique=True)

    class Meta:
        ordering = ["pk"]
        verbose_name = "url"
        verbose_name_plural = "urls"

    def save(self, *args, **kwargs):
        if not self.short_url:
            self.short_url = self.generate_short_url()
        super().save(*args, **kwargs)

    def generate_short_url(self):
        length = 6
        characters = string.ascii_letters + string.digits
        short_url = "".join(random.choice(characters) for _ in range(length))
        return short_url

    def __str__(self):
        return f"{self.original_url} -> {self.short_url}"
