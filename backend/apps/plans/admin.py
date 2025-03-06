"""Admin for Plans App."""

from django.contrib import admin

from .models import Plan, Feature, PlanFeature


class PlanFeatureInline(admin.TabularInline):
    model = PlanFeature
    extra = 1


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display: list[str] = [
        "name",
        "price_monthly",
        "price_annual",
        "discount_annual",
        "links_per_month",
        "api_links_per_month",
        "link_lifetime",
        "analytics_duration",
    ]
    search_fields: list[str] = ["name"]
    list_filter: list[str] = ["link_lifetime", "analytics_duration"]
    inlines: list = [PlanFeatureInline]


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display: list[str] = ["name", "category"]
    search_fields: list[str] = ["name"]
    list_filter: list[str] = ["category"]


@admin.register(PlanFeature)
class PlanFeatureAdmin(admin.ModelAdmin):
    list_display: list[str] = ["plan", "feature", "quantity"]
    search_fields: list[str] = ["plan__name", "feature__name"]
    list_filter: list[str] = ["plan", "feature"]
