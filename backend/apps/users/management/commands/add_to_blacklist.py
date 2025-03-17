"""Add to Blacklist command."""

from django.core.management.base import BaseCommand

from rest_framework_simplejwt.utils import aware_utcnow
from rest_framework_simplejwt.token_blacklist.models import (
    OutstandingToken,
    BlacklistedToken,
)


class Command(BaseCommand):
    help = "Add all expired refresh tokens to the blacklist."

    def handle(self, *args, **kwargs) -> None:
        expired_tokens = OutstandingToken.objects.filter(
            expires_at__lt=aware_utcnow(),
        )

        count = 0
        for outstanding_token in expired_tokens:
            try:
                if not BlacklistedToken.objects.filter(
                    token=outstanding_token
                ).exists():
                    BlacklistedToken.objects.create(token=outstanding_token)
                    count += 1
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error: {e}"))

        self.stdout.write(
            self.style.SUCCESS(
                f"The {count} expired tokens were added to blacklist.",
            )
        )
