import logging

from core.logging import setup_logging
from .command import Command

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class SubCreatedCommand(Command):
    def execute(self) -> None:
        attrs = self.payload["data"]["attributes"]
        email = attrs["user_email"]
        subscription_id = self.payload["data"]["id"]

        if email and subscription_id:
            logger.info("Creating subscription")
            # TODO: Add logic
        else:
            logger.warning("Missing data in subscription_created")
