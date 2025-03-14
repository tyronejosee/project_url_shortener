"""Admin for Urls App."""

from django.contrib import admin

from .models import URL, URLGroup, Click


@admin.register(URL)
class URLAdmin(admin.ModelAdmin):
    list_display: list[str] = ["url", "alias", "user__username", "privacy"]
    search_fields: list[str] = ["url", "alias"]
    list_filter: list[str] = ["privacy"]
    readonly_fields: list[str] = ["alias", "password"]

    def save_model(self, request, obj, form, change) -> None:
        if not obj.alias:
            obj.save()
        super().save_model(request, obj, form, change)


@admin.register(URLGroup)
class URLGroupAdmin(admin.ModelAdmin):
    list_display: list[str] = ["name", "user", "alias", "description"]
    search_fields: list[str] = ["name", "alias", "description"]
    list_filter: list[str] = ["user"]
    readonly_fields: list[str] = ["alias"]
    ordering: list[str] = ["name"]


@admin.register(Click)
class ClickAdmin(admin.ModelAdmin):
    list_display: list[str] = ["url", "ip_address"]
    search_fields: list[str] = ["url__url", "ip_address"]
