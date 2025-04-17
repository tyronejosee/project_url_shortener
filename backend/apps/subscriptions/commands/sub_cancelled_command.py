import logging

from django.utils.dateparse import parse_datetime

from core.logging import setup_logging
from ..models import Subscription
from .command import Command

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class SubCancelledCommand(Command):
    def execute(self) -> None:
        attrs = self.payload["data"]["attributes"]
        sub_id = attrs["first_subscription_item"]["subscription_id"]

        try:
            subscription = Subscription.objects.get(
                external_id=sub_id,
            )
        except Subscription.DoesNotExist:
            logger.error(f"Subscription not found: {sub_id}")
            raise ValueError("Subscription not found")

        subscription.status = attrs["status"]
        subscription.renews_at = parse_datetime(attrs["renews_at"])
        subscription.ends_at = parse_datetime(attrs["ends_at"])
        subscription.save()
