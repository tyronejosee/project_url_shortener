"""Models for Domains App."""

from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.utils.models import BaseModel
from .repositories import DomainRepository
from .choices import StatusChoices

User: type[AbstractUser] = get_user_model()


class Domain(BaseModel):
    """Model definition for Domain model."""

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    domain = models.URLField()
    status = models.CharField(
        max_length=10,
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING,
    )
    # TODO: Links, Clicks

    objects = DomainRepository()

    class Meta:
        db_table: str = "domains"
        ordering: list[str] = ["pk"]
        verbose_name: str = "domain"
        verbose_name_plural: str = "domains"

    def __str__(self) -> str:
        return str(self.domain)
