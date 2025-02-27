"""Discord Notifier for Observer pattern."""

import logging

import requests
from requests.exceptions import Timeout, RequestException, HTTPError

from core.logging import setup_logging
from .observer import Observer

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class DiscordNotifier(Observer):
    """
    Sends a notification to a Discord webhook.
    """

    def __init__(self, webhook_url: str) -> None:
        if not webhook_url:
            raise ValueError("Webhook URL cannot be empty.")
        self.webhook_url: str = webhook_url

    def notify(self, data: dict) -> None:
        name: str = f"# {data['name']}\n\n"
        email: str = f"- Email: `{data['email']}`\n"
        message: str = f"- Message: `{data['message']}`"
        payload: dict[str, str] = {"content": f"{name}{email}{message}"}

        try:
            response: requests.Response = requests.post(
                self.webhook_url,
                json=payload,
                timeout=5,
            )
            response.raise_for_status()
        except Timeout:
            logger.error("Request to Discord timed out.")
        except HTTPError as http_err:
            logger.error(f"HTTP error occurred: {http_err}")
        except RequestException as req_err:
            logger.error(f"Request failed: {req_err}")
        except Exception as err:
            logger.error(f"An unexpected error occurred: {err}")
        else:
            logger.info(f"Successfully sent message: {response.status_code}")
