"""Admin for Urls App."""

from django.contrib import admin

from .models import URL, Click


@admin.register(URL)
class URLAdmin(admin.ModelAdmin):
    list_display = ["original_url", "short_url", "created_at", "updated_at"]
    search_fields = ["original_url", "short_url"]
    list_filter = ["created_at", "updated_at"]
    readonly_fields = ["short_url"]

    def save_model(self, request, obj, form, change):
        if not obj.short_url:
            obj.save()
        super().save_model(request, obj, form, change)


@admin.register(Click)
class ClickAdmin(admin.ModelAdmin):
    list_display = ["url_id", "ip_address", "country"]
    search_fields = ["url_id__short_code", "ip_address", "country"]
    list_filter = ["country"]
