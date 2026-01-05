"""Services for Subscriptions App."""

from django.conf import settings

from apps.subscriptions.commands.dispatcher import EventDispatcher
from apps.subscriptions.exceptions import InvalidPayloadError, InvalidSignatureError
from apps.subscriptions.models import Plan
from apps.subscriptions.repositories import PlanRepository
from apps.utils.helpers import verify_signature


class GetPlansService:
    def __init__(self, plan_repository: PlanRepository) -> None:
        self.plan_repository = plan_repository

    def execute(self) -> list[Plan]:
        plans = self.plan_repository.get_plans_by_order()
        return list(plans)


class ProcessWebhookService:
    def __init__(self, raw_body: bytes, signature: str | None, payload: dict) -> None:
        self.raw_body = raw_body
        self.signature = signature
        self.payload = payload

    def execute(self) -> None:
        self._verify_signature()
        event_type: str = self._get_event_type()

        dispatcher = EventDispatcher(event_type, self.payload)
        dispatcher.dispatch()

    def _verify_signature(self) -> None:
        if not self.signature:
            raise InvalidSignatureError("Missing signature header")

        is_valid: bool = verify_signature(
            settings.LEMON_SQUEEZY_SECRET_KEY,
            self.raw_body,
            self.signature,
        )

        if not is_valid:
            raise InvalidSignatureError("Invalid webhook signature")

    def _get_event_type(self) -> str:
        try:
            event_type: str = self.payload["meta"]["event_name"]
        except KeyError:
            raise InvalidPayloadError("Missing meta.event_name")

        if not event_type:
            raise InvalidPayloadError("Empty event_name")

        return event_type
