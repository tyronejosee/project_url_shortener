"""Models for Urls App."""

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password, check_password
from django.db import models

from apps.utils.models import BaseModel
from .repositories import URLGroupRepository
from .choices import (
    PrivacyChoices,
    DeviceTypeChoices,
    BrowserTypeChoices,
    OSTypeChoices,
)

User = get_user_model()


class URL(BaseModel):
    """
    Model definition for URL.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.URLField(max_length=2000)
    alias = models.CharField(max_length=10, blank=True, unique=True)
    group = models.ForeignKey(
        "URLGroup",
        on_delete=models.CASCADE,
        related_name="urls",
        blank=True,
        null=True,
    )
    privacy = models.CharField(
        max_length=10,
        choices=PrivacyChoices.choices,
        default=PrivacyChoices.PUBLIC,
    )
    password = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table: str = "urls"
        ordering: list[str] = ["user"]
        verbose_name: str = "url"
        verbose_name_plural: str = "urls"

    def save(self, *args, **kwargs) -> None:
        from .services import URLService

        if not self.alias:
            self.alias = URLService.generate_alias()
        if self.password:
            self.password = make_password(self.password)

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.url} -> {self.alias}"

    def check_password(self, raw_password: str) -> bool:
        if self.password:
            return check_password(raw_password, self.password)
        return False


class URLGroup(BaseModel):
    """
    Model definition for Group.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    alias = models.CharField(max_length=10, blank=True, unique=True)
    description = models.TextField(blank=True, null=True)

    objects = URLGroupRepository()

    class Meta:
        db_table: str = "url_groups"
        ordering: list[str] = ["user"]
        verbose_name: str = "url group"
        verbose_name_plural: str = "url groups"

    def save(self, *args, **kwargs) -> None:
        from .services import URLService

        if not self.alias:
            self.alias = URLService.generate_alias()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Click(BaseModel):
    """
    Model definition for Click.
    """

    url = models.ForeignKey(
        URL,
        on_delete=models.CASCADE,
        related_name="clicks",
    )
    ip_address = models.GenericIPAddressField()
    device = models.CharField(
        max_length=20,
        choices=DeviceTypeChoices.choices,
        default=DeviceTypeChoices.UNKNOWN,
    )
    browser = models.CharField(
        max_length=20,
        choices=BrowserTypeChoices.choices,
        default=BrowserTypeChoices.UNKNOWN,
    )
    os = models.CharField(
        max_length=20,
        choices=OSTypeChoices.choices,
        default=OSTypeChoices.UNKNOWN,
    )

    class Meta:
        db_table: str = "clicks"
        ordering: list[str] = ["url"]
        verbose_name: str = "click"
        verbose_name_plural: str = "clicks"

    def __str__(self) -> str:
        return f"Click on {self.url.url}"
