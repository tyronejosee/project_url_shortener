from django.apps import AppConfig


class SubscriptionsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.subscriptions"

    def ready(self) -> None:
        import apps.subscriptions.signals  # noqa: F401
