"""Serializers for Plans App."""

from rest_framework import serializers

from .models import Plan, Feature, PlanFeature


class FeatureSerializer(serializers.ModelSerializer):
    """
    Serializer for Feature model.
    """

    class Meta:
        model = Feature
        fields: list[str] = ["id", "name", "category"]


class PlanFeatureSerializer(serializers.ModelSerializer):
    """
    Serializer for PlanFeature model with flattened feature fields.
    """

    name = serializers.CharField(source="feature.name")

    class Meta:
        model = PlanFeature
        fields: list[str] = [
            "id",
            "name",
            "quantity",
            "is_active",
        ]


class PlanSerializer(serializers.ModelSerializer):
    """
    Serializer for Plan model.
    """

    plan_features = PlanFeatureSerializer(many=True)

    class Meta:
        model = Plan
        fields: list[str] = [
            "id",
            "name",
            "description",
            "order",
            "price_monthly",
            "price_annual",
            "discount_annual",
            "checkout_url",
            "links_per_month",
            "api_links_per_month",
            "link_lifetime",
            "analytics_duration",
            "plan_features",
            "is_test_mode",
        ]
