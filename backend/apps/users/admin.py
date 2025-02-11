"""Admin for Users App."""

from django.contrib import admin

from apps.utils.admin import BaseAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseAdmin):
    """Admin for User model."""

    list_display = ["username", "email", "is_staff"]
    list_display_links = ["username"]
    search_fields = ["username", "email"]
    list_filter = ["is_staff", "is_superuser", "is_active"]
    readonly_fields = ["pk"]
    ordering = ["username"]
