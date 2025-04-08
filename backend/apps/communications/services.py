"""Services for Communications App."""

import json

from django.conf import settings as cfg
from rest_framework.exceptions import ValidationError

from .observers.notifier import Notifier
from .observers.discord import DiscordNotifier


class NotificationService:
    def __init__(self, webhook_key: str) -> None:
        self.notifier = Notifier()
        self.notifier.attach(
            DiscordNotifier(cfg.DISCORD_WEBHOOKS[webhook_key]),
        )

    def send_notification(self, validated_data: dict, category: str) -> None:
        self.notifier.notify_all(validated_data, category)


class DonationService:
    """
    Service for donation webhooks.
    """

    def __init__(self, data: dict) -> None:
        self.data: dict = data

    def validate_webhook(self, data: dict) -> bool:
        """
        Validate the webhook token.
        """
        token: str = data["verification_token"]
        if token != cfg.KOFI_SECRET_KEY:
            raise ValidationError("Invalid verification token")
        return True

    def parse_data(self) -> dict:
        """
        Parse and validate the raw data.
        """
        raw_data = self.data["data"]
        if not raw_data:
            raise ValidationError("Missing data in request")
        try:
            return json.loads(raw_data)
        except json.JSONDecodeError:
            raise ValidationError("Invalid JSON format")

    def process_donation(
        self,
        parsed_data: dict,
        webhook_key: str,
        category: str,
    ) -> bool:
        """
        Process the parsed donation data.
        """
        NotificationService(webhook_key).send_notification(
            parsed_data,
            category,
        )
        return True
