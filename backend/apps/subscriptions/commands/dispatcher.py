import logging

from core.logging import setup_logging
from .sub_created_command import SubCreatedCommand
from .sub_payment_success_command import SubPaymentSuccessCommand
from .sub_updated_command import SubUpdatedCommand
from .sub_cancelled_command import SubCancelledCommand

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class EventDispatcher:
    def __init__(self, event: str, payload: dict) -> None:
        self.event: str = event
        self.payload: dict = payload
        self.commands: dict = {
            "subscription_created": SubCreatedCommand,
            "subscription_payment_success": SubPaymentSuccessCommand,
            "subscription_updated": SubUpdatedCommand,
            "subscription_cancelled": SubCancelledCommand,
        }

    def dispatch(self) -> None:
        command_cls = self.commands.get(self.event)
        if not command_cls:
            logger.error(f"No handler for event: {self.event}")
            return

        try:
            command = command_cls(self.payload)
            command.execute()
        except Exception as e:
            logger.error(f"Error processing webhook: {e}")
