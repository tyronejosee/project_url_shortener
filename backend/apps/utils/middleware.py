"""Middleware for Utils App."""

import logging
import re
from typing import Callable

from django.conf import settings as conf
from django.core.handlers.wsgi import WSGIRequest
from django.http import JsonResponse

from core.logging import setup_logging

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class VerificationApiKeyMiddleware:
    """
    Middleware to check the presence and validity of the API KEY
    in the request headers. If the API KEY is missing or incorrect,
    a 403 Forbidden response is returned.
    """

    EXCLUDED_PATH_PREFIXES: tuple[str, ...] = (
        "/api/schema/",
        "/dashboard/",
        "/verify-password/",
        "/static/",
    )

    def __init__(self, get_response: Callable) -> None:
        self.get_response = get_response

    def __call__(self, request: WSGIRequest) -> JsonResponse:
        if self.is_shortener_link(request.path):
            return self.get_response(request)

        if request.path.startswith(self.EXCLUDED_PATH_PREFIXES):
            return self.get_response(request)

        api_key = request.headers.get("X-API-KEY")
        if not api_key or not self.is_valid_code(api_key):
            logger.warning("Invalid or missing API KEY.")
            return JsonResponse({"error": "Invalid or missing API KEY."}, status=403)
        return self.get_response(request)

    def is_valid_code(self, code: str) -> bool:
        return code == conf.API_KEY

    def is_shortener_link(self, path: str) -> bool:
        return bool(re.match(r"^/[a-zA-Z0-9]{6}$", path))
