from functools import lru_cache

from apps.subscriptions.repositories import PlanRepository
from apps.subscriptions.services import GetPlansService, ProcessWebhookService


@lru_cache
def get_plan_repository() -> PlanRepository:
    return PlanRepository()


def get_plans_service() -> GetPlansService:
    return GetPlansService(get_plan_repository())


def get_process_webhook_service(
    raw_body: bytes, signature: str | None, payload: dict
) -> ProcessWebhookService:
    return ProcessWebhookService(raw_body, signature, payload)
