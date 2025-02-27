"""Admin for Urls App."""

from django.contrib import admin

from .models import URL, Click


@admin.register(URL)
class URLAdmin(admin.ModelAdmin):
    list_display: list[str] = ["url", "alias", "created_at", "updated_at"]
    search_fields: list[str] = ["url", "alias"]
    list_filter: list[str] = ["created_at", "updated_at"]
    readonly_fields: list[str] = ["alias"]

    def save_model(self, request, obj, form, change) -> None:
        if not obj.alias:
            obj.save()
        super().save_model(request, obj, form, change)


@admin.register(Click)
class ClickAdmin(admin.ModelAdmin):
    list_display: list[str] = ["url", "ip_address", "country"]
    search_fields: list[str] = ["url__url", "ip_address", "country"]
    list_filter: list[str] = ["country"]
