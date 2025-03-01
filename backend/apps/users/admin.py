"""Admin for Users App."""

from django.contrib import admin

from apps.utils.admin import BaseAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseAdmin):
    """Admin for User model."""

    list_display: list[str] = ["username", "email", "is_staff"]
    list_display_links: list[str] = ["username"]
    search_fields: list[str] = ["username", "email"]
    list_filter: list[str] = ["is_staff", "is_superuser", "is_active"]
    readonly_fields: list[str] = ["pk"]
    ordering: list[str] = ["username"]
