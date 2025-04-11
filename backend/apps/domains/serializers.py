"""Serializers for Domains App."""

from rest_framework import serializers

from .models import Domain


class DomainReadSerializer(serializers.ModelSerializer):
    """Serializer for Domain model (List/retrieve)."""

    status = serializers.CharField(source="get_status_display")

    class Meta:
        model = Domain
        fields: list[str] = [
            "id",
            "domain",
            "status",
            "created_at",
        ]


class DomainWriteSerializer(serializers.ModelSerializer):
    """Serializer for Domain model (Create/update)."""

    class Meta:
        model = Domain
        fields: list[str] = ["domain"]
