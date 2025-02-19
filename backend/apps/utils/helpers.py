"""Helpers for Utils App."""

import uuid


def generate_email(domain="fake.com"):
    """
    Generate a unique, random email address.
    """
    unique_id = uuid.uuid4().hex
    random_email = f"anon-{unique_id}@{domain}"
    return random_email


def generate_username():
    """
    Generate a unique, random username.
    """
    unique_id = uuid.uuid4().hex
    random_username = f"anon-{unique_id}"
    return random_username
