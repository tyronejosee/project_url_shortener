"""Serializers for Communications App."""

from rest_framework import serializers


class NotificationSerializer(serializers.Serializer):
    """
    Serializer for Support and Feedback request.
    """

    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField(max_length=250)
