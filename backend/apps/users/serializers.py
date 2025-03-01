"""Serializers for Users App."""

from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer

User = get_user_model()


class UserReadSerializer(UserCreateSerializer):
    """Serializer for User model."""

    plan = serializers.CharField(source="get_plan_display", read_only=True)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields: list[str] = [
            "id",
            "email",
            "username",
            "slug",
            "plan",
            "is_active",
            "is_staff",
        ]


class UserWriteSerializer(UserCreateSerializer):
    """Serializer for User model."""

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields: list[str] = [
            "email",
            "username",
            "is_active",
            "is_staff",
        ]
