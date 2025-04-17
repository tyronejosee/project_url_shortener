"""Signals for Subscriptions App."""

from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.users.models import PlanChoices
from .models import Subscription


@receiver(post_save, sender=Subscription)
def sync_user_plan(sender, instance, **kwargs) -> None:
    user = instance.user

    new_plan = instance.plan if instance.status == "active" else PlanChoices.FREE
    # TODO: Add logic to end subscriptions (end_at, "canceled" status)
    if user.plan != new_plan:
        user.plan = new_plan
        user.save(update_fields=["plan"])
