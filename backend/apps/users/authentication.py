import logging

from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

from core.logging import setup_logging

setup_logging()
logger: logging.Logger = logging.getLogger(__name__)


class CustomJWTAuthentication(JWTAuthentication):
    """
    Custom authentication class for handling JWT tokens in requests.

    This class extends the default JWTAuthentication provided
    by `rest_framework_simplejwt` and overrides the `authenticate` method
    to handle token validation and user retrieval.
    Additionally, it logs errors and handles invalid tokens gracefully.
    """

    def authenticate(self, request) -> None | tuple:
        try:
            header = self.get_header(request)
            raw_token = (
                self.get_raw_token(header)
                if header
                else request.COOKIES.get(settings.AUTH_COOKIE)
            )
            if raw_token is None:
                return None
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token

        except InvalidToken:
            return None
        except Exception as e:
            logger.error(e)
            return None
