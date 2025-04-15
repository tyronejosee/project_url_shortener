import logging

from core.logging import setup_logging
from .command import Command

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class SubUpdatedCommand(Command):
    def execute(self) -> None:
        logger.info("Subscription updated.")
        # TODO: Add logic
