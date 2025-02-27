"""Services for Communications App."""

from django.conf import settings as cfg

from .observers.notifier import Notifier
from .observers.discord import DiscordNotifier


class NotificationService:
    def __init__(self, webhook_key: str) -> None:
        self.notifier = Notifier()
        self.notifier.attach(
            DiscordNotifier(cfg.DISCORD_WEBHOOKS[webhook_key]),
        )

    def send_notification(self, validated_data: dict) -> None:
        self.notifier.notify_all(validated_data)
