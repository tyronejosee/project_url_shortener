"""Serializers for Users App."""

from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer

User = get_user_model()


class UserReadSerializer(UserCreateSerializer):
    """Serializer for User model."""

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ["id", "username"]


class UserWriteSerializer(UserCreateSerializer):
    """Serializer for User model."""

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            "id",
            "email",
            "username",
            "is_active",
            "is_staff",
            "created_at",
            "updated_at",
        ]
