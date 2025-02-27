"""Logging configs for app."""

import sys
import logging

from colorlog import ColoredFormatter


def setup_logging(
    log_to_file: bool = False,
    log_filename: str = "api.log",
) -> None:
    """
    Sets up logging for the application.
    """

    # Format for console logs
    formatter = ColoredFormatter(
        "%(log_color)s%(asctime)s [%(levelname)s] %(message)s",
        datefmt="%Y-%m-%d %H:%M",
        log_colors={
            "DEBUG": "cyan",
            "INFO": "green",
            "WARNING": "yellow",
            "ERROR": "red",
            "CRITICAL": "bold_red",
        },
    )

    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)

    handlers = [console_handler]

    # File handler (if enabled)
    if log_to_file:
        file_handler = logging.FileHandler(log_filename, encoding="utf-8")
        file_formatter = logging.Formatter(
            "%(asctime)s [%(levelname)s] %(message)s", datefmt="%Y-%m-%d %H:%M"
        )
        file_handler.setFormatter(file_formatter)
        handlers.append(file_handler)

    logging.basicConfig(level=logging.INFO, handlers=handlers, force=True)
