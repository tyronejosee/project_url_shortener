import logging

from apps.subscriptions.commands.command import Command
from apps.subscriptions.models import Subscription
from core.logging import setup_logging

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class SubPaymentSuccessCommand(Command):
    def execute(self) -> None:
        attrs = self.payload["data"]["attributes"]
        sub_id = attrs["subscription_id"]

        try:
            subscription = Subscription.objects.get(
                external_id=sub_id,
            )
        except Subscription.DoesNotExist:
            logger.error(f"No subscription with external_id {sub_id}")
            return

        if not subscription.is_paid:
            subscription.is_paid = True
            subscription.save(update_fields=["is_paid"])
