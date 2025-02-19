"""Choices for Users App."""

from django.db import models


class PlanChoices(models.TextChoices):
    FREE = "free", "Free Plan"
    BASIC = "basic", "Basic Plan"
    PREMIUM = "premium", "Premium Plan"
