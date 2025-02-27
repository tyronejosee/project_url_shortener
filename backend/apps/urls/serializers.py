"""Serializers for Urls App."""

from datetime import datetime

from django.db.models import Count
from django.db.models.functions import TruncDate
from rest_framework import serializers

from .models import URL
from .choices import DeviceTypeChoices, BrowserTypeChoices, OSTypeChoices


class URLSerializer(serializers.ModelSerializer):
    """Serializer for URL model (Create)."""

    class Meta:
        model = URL
        fields: list[str] = ["url", "alias"]


class URLStatsSerializer(serializers.ModelSerializer):
    """
    Serializer for URL stats (retrieve).
    """

    # TODO: Optimize

    clicks = serializers.SerializerMethodField()
    unique_visitors = serializers.SerializerMethodField()
    last_accessed = serializers.SerializerMethodField()
    devices = serializers.SerializerMethodField()
    browsers = serializers.SerializerMethodField()
    oss = serializers.SerializerMethodField()
    clicks_over_time = serializers.SerializerMethodField()

    class Meta:
        model = URL
        fields: list[str] = [
            "alias",
            "clicks",
            "unique_visitors",
            "last_accessed",
            "devices",
            "browsers",
            "oss",
            "clicks_over_time",
        ]

    def get_clicks(self, obj) -> int:
        return obj.clicks.count()

    def get_unique_visitors(self, obj) -> int:
        return obj.clicks.values("ip_address").distinct().count()

    def get_last_accessed(self, obj) -> datetime | None:
        last_click = obj.clicks.order_by("-created_at").first()
        return last_click.created_at if last_click else None

    def get_devices(self, obj) -> dict[DeviceTypeChoices, int]:
        device_counts: dict[DeviceTypeChoices, int] = {
            device[0]: 0 for device in DeviceTypeChoices.choices
        }
        db_counts = obj.clicks.values("device").annotate(count=Count("device"))
        for entry in db_counts:
            device_counts[entry["device"]] = entry["count"]
        return device_counts

    def get_browsers(self, obj) -> dict[BrowserTypeChoices, int]:
        browser_counts: dict[BrowserTypeChoices, int] = {
            browser[0]: 0 for browser in BrowserTypeChoices.choices
        }
        db_counts = obj.clicks.values("browser").annotate(
            count=Count("browser"),
        )
        for entry in db_counts:
            browser_counts[entry["browser"]] = entry["count"]
        return browser_counts

    def get_oss(self, obj) -> dict[OSTypeChoices, int]:
        os_counts: dict[OSTypeChoices, int] = {os[0]: 0 for os in OSTypeChoices.choices}
        db_counts = obj.clicks.values("os").annotate(
            count=Count("os"),
        )
        for entry in db_counts:
            os_counts[entry["os"]] = entry["count"]
        return os_counts

    def get_clicks_over_time(self, obj) -> list[dict]:
        click_data = (
            obj.clicks.annotate(date=TruncDate("created_at"))
            .values("date")
            .annotate(count=Count("id"))
            .order_by("date")
        )
        return [
            {
                "date": entry["date"],
                "clicks": entry["count"],
            }
            for entry in click_data
        ]
