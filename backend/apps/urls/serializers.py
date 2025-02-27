"""Serializers for Urls App."""

from rest_framework import serializers
from collections import Counter

from .models import URL


class URLSerializer(serializers.ModelSerializer):
    """Serializer for URL model (Create)."""

    class Meta:
        model = URL
        fields: list[str] = [
            "url",
            "alias",
        ]


class URLStatsSerializer(serializers.ModelSerializer):
    """
    Serializer for URL stats (retrieve).
    """

    clicks = serializers.SerializerMethodField()
    unique_visitors = serializers.SerializerMethodField()
    last_accessed = serializers.SerializerMethodField()
    geo_distribution = serializers.SerializerMethodField()

    class Meta:
        model = URL
        fields: list[str] = [
            "alias",
            "clicks",
            "unique_visitors",
            "last_accessed",
            "geo_distribution",
        ]

    def get_clicks(self, obj):
        return obj.clicks.count()

    def get_unique_visitors(self, obj):
        return obj.clicks.values("ip_address").distinct().count()

    def get_last_accessed(self, obj):
        last_click = obj.clicks.order_by("-created_at").first()
        return last_click.created_at if last_click else None

    def get_geo_distribution(self, obj):
        country_counts = Counter(obj.clicks.values_list("country", flat=True))
        return dict(country_counts)
