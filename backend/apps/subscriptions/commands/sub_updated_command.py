import logging

from apps.subscriptions.commands.command import Command
from core.logging import setup_logging

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class SubUpdatedCommand(Command):
    def execute(self) -> None:
        logger.info("Subscription updated.")
        # TODO: Add logic
