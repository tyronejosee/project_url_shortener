import logging

from django.utils.dateparse import parse_datetime

from apps.subscriptions.commands.command import Command
from apps.subscriptions.models import Subscription
from apps.users.models import User
from core.logging import setup_logging

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class SubCreatedCommand(Command):
    def execute(self) -> None:
        attrs = self.payload["data"]["attributes"]
        sub_id = attrs["first_subscription_item"]["subscription_id"]
        email = attrs["user_email"]

        user: User | None = User.objects.filter(email=email).first()
        if not user:
            logger.warning(f"No user with email {email}")
            return

        Subscription.objects.update_or_create(
            external_id=sub_id,
            defaults={
                "user": user,
                "plan": attrs["product_name"].lower().removesuffix(" plan"),
                "status": attrs["status"],
                "store_id": attrs["store_id"],
                "product_id": attrs["product_id"],
                "variant_id": attrs["variant_id"],
                "customer_id": attrs["customer_id"],
                "renews_at": parse_datetime(attrs["renews_at"]),
            },
        )
