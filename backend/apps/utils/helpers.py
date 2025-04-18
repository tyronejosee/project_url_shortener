"""Helpers for Utils App."""

import uuid
import hmac
import hashlib


def generate_email(domain="fake.com") -> str:
    """
    Generate a unique, random email address.
    """
    unique_id: str = uuid.uuid4().hex
    random_email: str = f"anon-{unique_id}@{domain}"
    return random_email


def generate_username() -> str:
    """
    Generate a unique, random username.
    """
    unique_id: str = uuid.uuid4().hex
    random_username: str = f"anon-{unique_id}"
    return random_username


def verify_signature(
    secret_key: str,
    raw_body: bytes,
    received_signature: str,
) -> bool:
    """
    Verify the signature of a webhook payload.
    """
    computed_signature: str = hmac.new(
        key=secret_key.encode("utf-8"),
        msg=raw_body,
        digestmod=hashlib.sha256,
    ).hexdigest()

    return hmac.compare_digest(computed_signature, received_signature)
