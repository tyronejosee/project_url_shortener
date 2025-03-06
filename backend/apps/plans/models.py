"""Models for Plans App."""

from decimal import Decimal

from django.db import models

from apps.utils.models import BaseModel
from apps.utils.repositories import BaseRepository
from .repositories import PlanRepository
from .choices import (
    LinkLifetimeChoices,
    AnalyticsDurationChoices,
    CategoryChoices,
)


class Plan(BaseModel):
    """
    Model definition for Plan.
    """

    name = models.CharField(max_length=150, unique=True)
    description = models.CharField(max_length=100, blank=True)
    price_monthly = models.DecimalField(max_digits=10, decimal_places=2)
    price_annual = models.DecimalField(max_digits=10, decimal_places=2)
    discount_annual = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=Decimal("0.00"),
    )
    links_per_month = models.PositiveIntegerField(default=0)
    api_links_per_month = models.PositiveIntegerField(default=0)
    link_lifetime = models.CharField(
        max_length=50,
        choices=LinkLifetimeChoices.choices,
        default=LinkLifetimeChoices.INFINITY,
    )
    analytics_duration = models.CharField(
        max_length=50,
        choices=AnalyticsDurationChoices.choices,
        default=AnalyticsDurationChoices.ONE_MONTH,
    )

    objects: BaseRepository = PlanRepository()

    class Meta:
        db_table: str = "plans"
        ordering: list[str] = ["name"]
        verbose_name: str = "plan"
        verbose_name_plural: str = "plans"

    def __str__(self) -> str:
        return self.name


class Feature(BaseModel):
    """
    Model definition for Feature.
    """

    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(
        max_length=10,
        choices=CategoryChoices.choices,
        default=CategoryChoices.BRANDING,
    )

    class Meta:
        db_table: str = "features"
        ordering: list[str] = ["name"]
        verbose_name: str = "feature"
        verbose_name_plural: str = "features"

    def __str__(self) -> str:
        return self.name


class PlanFeature(models.Model):
    """
    Model definition for PlanFeature.
    """

    plan = models.ForeignKey(
        Plan,
        related_name="plan_features",
        on_delete=models.CASCADE,
    )
    feature = models.ForeignKey(
        Feature,
        related_name="plan_features",
        on_delete=models.CASCADE,
    )
    is_active = models.BooleanField(default=True)
    quantity = models.PositiveIntegerField(default=0, null=True, blank=True)

    class Meta:
        db_table: str = "plan_features"
        ordering: list[str] = ["plan", "feature"]
        verbose_name: str = "plan_feature"
        verbose_name_plural: str = "plan_features"
        constraints: list = [
            models.UniqueConstraint(
                fields=["plan", "feature"], name="unique_plan_feature"
            )
        ]

    def __str__(self) -> str:
        return f"{self.plan.name} - {self.feature.name}"
