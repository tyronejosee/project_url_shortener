import logging

from core.logging import setup_logging
from .command import Command

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class SubCancelledCommand(Command):
    def execute(self) -> None:
        email = self.payload["data"]["attributes"]["user_email"]
        if email:
            logger.info(f"Cancelling subscription for {email}")
            # TODO: Add logic
        else:
            logger.warning("Missing email in subscription_cancelled")
