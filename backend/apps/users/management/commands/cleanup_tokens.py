"""Cleanup tokens command."""

from django.core.management.base import BaseCommand

from rest_framework_simplejwt.utils import aware_utcnow
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken


class Command(BaseCommand):
    help = "Remove all expired refresh tokens."

    def handle(self, *args, **kwargs) -> None:
        expired_tokens = OutstandingToken.objects.filter(
            expires_at__lt=aware_utcnow(),
        )

        count = 0
        for outstanding_token in expired_tokens:
            try:
                outstanding_token.delete()
                count += 1
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error: {e}"))

        self.stdout.write(
            self.style.SUCCESS(f"The {count} expired tokens were removed.")
        )
