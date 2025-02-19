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
    ip_address = models.GenericIPAddressField(
        unique=True,
        null=True,
        blank=True,
    )
    plan = models.CharField(
        max_length=10,
        choices=PlanChoices.choices,
        default=PlanChoices.FREE,
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        ordering = ["pk"]
        verbose_name = "user"
        verbose_name_plural = "users"

    def __str__(self):
        return self.username
