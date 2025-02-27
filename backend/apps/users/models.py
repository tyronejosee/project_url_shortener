"""Models for Users App."""

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from apps.utils.models import BaseModel
from .managers import UserManager
from .choices import PlanChoices


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    """Model definition for User (Entity)."""

    email = models.EmailField(max_length=100, unique=True, db_index=True)
    username = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    plan = models.CharField(
        max_length=10,
        choices=PlanChoices.choices,
        default=PlanChoices.FREE,
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD: str = "email"
    REQUIRED_FIELDS: list[str] = ["username"]

    class Meta:
        db_table: str = "users"
        ordering: list[str] = ["pk"]
        verbose_name: str = "user"
        verbose_name_plural: str = "users"

    def __str__(self) -> str:
        return f"{self.pk} - {self.username}"
