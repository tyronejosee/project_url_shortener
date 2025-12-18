"""Choices for Subscriptions App."""

from django.db import models


class LinkLifetimeChoices(models.TextChoices):
    INFINITY = "infinity", "Infinity"
    LIMITED = "limited", "Limited"


class AnalyticsDurationChoices(models.TextChoices):
    ONE_MONTH = "1 month", "1 Month"
    ONE_YEAR = "1 year", "1 Year"
    THREE_YEARS = "3 years", "3 Years"


class CategoryChoices(models.TextChoices):
    SECURITY = "security", "Security"
    BRANDING = "branding", "Branding"
    ANALYTICS = "analytics", "Analytics"
