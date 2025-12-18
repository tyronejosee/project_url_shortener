"""Admin for Subscriptions App."""

from django.contrib import admin

from apps.subscriptions.models import Plan, Feature, PlanFeature, Subscription


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
        "order",
        "analytics_duration",
    ]
    search_fields: list[str] = ["name"]
    list_filter: list[str] = ["link_lifetime", "analytics_duration"]
    ordering: list[str] = ["order"]
    inlines: list = [PlanFeatureInline]


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display: list[str] = ["name", "category", "order"]
    search_fields: list[str] = ["name"]
    list_filter: list[str] = ["category"]
    ordering: list[str] = ["order"]


@admin.register(PlanFeature)
class PlanFeatureAdmin(admin.ModelAdmin):
    list_display: list[str] = ["plan", "feature", "quantity"]
    search_fields: list[str] = ["plan__name", "feature__name"]
    list_filter: list[str] = ["plan", "feature"]


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display: list[str] = [
        "user",
        "plan",
        "status",
        "updated_at",
        "store_id",
        "product_id",
        "variant_id",
        "customer_id",
        "is_paid",
    ]
    search_fields: list[str] = ["user__email"]
    list_filter: list[str] = ["status", "is_paid"]
    ordering: list[str] = ["user"]
