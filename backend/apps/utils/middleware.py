"""Middleware for Utils App."""

import re
import logging
from typing import Callable

from django.core.handlers.wsgi import WSGIRequest
from django.http import JsonResponse
from django.conf import settings as conf

from core.logging import setup_logging

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class VerificationCodeMiddleware:
    """
    Middleware to check the presence and validity of the verification code
    in the request headers. If the verification code is missing or incorrect,
    a 403 Forbidden response is returned.
    """

    EXCLUDED_PATHS: set[str] = {
        "/dashboard/",
        "/verify-password/",
    }

    def __init__(self, get_response: Callable) -> None:
        self.get_response = get_response

    def __call__(self, request: WSGIRequest) -> JsonResponse:
        if self.is_shortener_link(request.path):
            return self.get_response(request)

        if any(request.path.startswith(path) for path in self.EXCLUDED_PATHS):
            return self.get_response(request)

        verification_code = request.headers.get("X-Verification-Code")
        if not verification_code or not self.is_valid_code(verification_code):
            logger.warning("Invalid or missing verification code.")
            return JsonResponse(
                {"error": "Invalid or missing verification code."},
                status=403,
            )
        return self.get_response(request)

    def is_valid_code(self, code: str) -> bool:
        return code == conf.VERIFICATION_CODE

    def is_shortener_link(self, path: str) -> bool:
        return bool(re.match(r"^/[a-zA-Z0-9]{6}$", path))
