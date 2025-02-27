"""Services for Urls App."""

import random
import string


class URLService:
    """
    Service for URL model.
    """

    @staticmethod
    def generate_alias() -> str:
        length = 6
        characters: str = string.ascii_letters + string.digits
        alias: str = "".join(random.choice(characters) for _ in range(length))
        return alias
