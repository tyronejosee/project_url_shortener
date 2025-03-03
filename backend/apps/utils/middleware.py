"""Middleware for Utils App."""

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

    def __init__(self, get_response: Callable) -> None:
        self.get_response = get_response

    def __call__(self, request: WSGIRequest) -> JsonResponse:
        if request.path.startswith("/dashboard/"):
            return self.get_response(request)

        verification_code = request.headers.get("X-Verification-Code")
        if not verification_code or not self.is_valid_code(verification_code):
            return JsonResponse(
                {"error": "Invalid or missing verification code."},
                status=403,
            )
        response = self.get_response(request)
        return response

    def is_valid_code(self, code: str) -> bool:
        return code == conf.VERIFICATION_CODE
