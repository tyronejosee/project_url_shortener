"""Admin for Domains App."""

from django.contrib import admin

from .models import Domain


@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    """Admin config for Domain model."""

    list_display: list[str] = [
        "user",
        "domain",
        "status",
        "is_available",
        "created_at",
        "updated_at",
    ]
    list_filter: list[str] = ["status", "user"]
    search_fields: list[str] = ["name", "user__username"]
    ordering: list[str] = ["-created_at"]

    fieldsets: tuple = (
        (None, {"fields": ("user", "name", "status", "is_available")}),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )
