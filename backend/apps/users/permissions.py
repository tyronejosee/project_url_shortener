"""Permissions for Users App."""

from rest_framework.permissions import BasePermission

from .choices import PlanChoices


class IsOwner(BasePermission):
    """
    Allows access only allow owners of an object to access it.
    """

    def has_object_permission(self, request, obj) -> bool:
        return bool(obj.user_id == request.user)


class BaseRolePermission(BasePermission):
    """
    Base permission class that checks if a user has a specific role.
    """

    required_plans: list = []

    def has_permission(self, request, view) -> bool:
        user_auth: bool = request.user and request.user.is_authenticated
        user_valid: bool = (
            request.user.is_active and request.user.plan in self.required_plans
        )
        return bool(user_auth and user_valid)


class IsFree(BaseRolePermission):
    """
    Allows access only to users with free plan.
    """

    required_plans: list = [PlanChoices.FREE]


class IsBasic(BaseRolePermission):
    """
    Allows access only to users with the basic plan.
    """

    required_plans: list = [PlanChoices.BASIC]


class IsPremium(BaseRolePermission):
    """
    Allows access only to users with the premium plan.
    """

    required_plans: list = [PlanChoices.PREMIUM]
