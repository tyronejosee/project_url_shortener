"""Models for Urls App."""

from django.db import models

from apps.utils.models import BaseModel


class URL(BaseModel):
    """
    Model definition for URL.
    """

    original_url = models.URLField(max_length=2000)
    short_url = models.CharField(max_length=10, blank=True, unique=True)
    click_count = models.IntegerField(default=0)

    class Meta:
        ordering = ["pk"]
        verbose_name = "url"
        verbose_name_plural = "urls"

    def save(self, *args, **kwargs):
        from .services import URLService

        if not self.short_url:
            self.short_url = URLService.generate_short_url()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.original_url} -> {self.short_url}"


class Click(BaseModel):
    """
    Model definition for Click.
    """

    url_id = models.ForeignKey(
        URL,
        on_delete=models.CASCADE,
        related_name="clicks",
    )
    ip_address = models.GenericIPAddressField()
    country = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"Click on {self.url_id.short_url}"
