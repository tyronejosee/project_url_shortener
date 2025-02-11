"""Services for Urls App."""

import random
import string


class URLService:
    """
    Service for URL model.
    """

    @staticmethod
    def generate_short_url():
        length = 6
        characters = string.ascii_letters + string.digits
        short_url = "".join(random.choice(characters) for _ in range(length))
        return short_url
