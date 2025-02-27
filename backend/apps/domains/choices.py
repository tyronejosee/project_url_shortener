"""Choices for Domains App."""

from django.db import models


class StatusChoices(models.TextChoices):
    """
    Choices for Domain status.
    """

    VERIFIED = "verified", "Verified"
    FAILED = "failed", "Failed"
    PENDING = "pending", "Pending"
