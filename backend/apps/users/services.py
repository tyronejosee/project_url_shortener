"""Services for Urls App."""

from django.contrib.auth import get_user_model
from rest_framework.request import Request

from apps.utils.helpers import generate_email, generate_username

User = get_user_model()


class UserService:
    """
    Service for User model.
    """

    @staticmethod
    def get_or_create_user(request: Request):
        """
        Retrieves or creates a user based on their IP address.
        If the user is authenticated, it returns them directly.
        If the user is not authenticated, it attempts to find a user
        by their IP address. If no user is found, a new one is created.
        """
        if request.user.is_authenticated:
            return request.user

        user_ip = request.META.get("REMOTE_ADDR")
        user = User.objects.filter(ip_address=user_ip).first()
        if not user:
            user = User.objects.create(
                email=generate_email(),
                username=generate_username(),
                ip_address=user_ip,
            )
        return user
