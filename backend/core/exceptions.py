"""Exceptions for Core App."""

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler

from apps.domains.exceptions import DomainNotFound, DomainNotOwned


def custom_exception_handler(exc, context) -> Response | None:
    if isinstance(exc, DomainNotFound):
        return Response(
            {"detail": str(exc)},
            status=status.HTTP_404_NOT_FOUND,
        )

    if isinstance(exc, DomainNotOwned):
        return Response(
            {"detail": str(exc)},
            status=status.HTTP_403_FORBIDDEN,
        )

    return exception_handler(exc, context)
