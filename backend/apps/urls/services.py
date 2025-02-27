"""Services for Urls App."""

import random
import string

from rest_framework.request import Request
from user_agents import parse
from user_agents.parsers import UserAgent

from .models import URL, Click
from .choices import DeviceTypeChoices, BrowserTypeChoices, OSTypeChoices


class URLService:
    """
    Service for URL model.
    """

    @staticmethod
    def generate_alias() -> str:
        """
        Generates a random alias consisting of 6 alphanumeric characters.
        """
        length = 6
        characters: str = string.ascii_letters + string.digits
        alias: str = "".join(random.choice(characters) for _ in range(length))
        return alias

    @staticmethod
    def get_device_info(user_agent: UserAgent) -> str:
        """
        Determines the device type from the user agent.
        """
        if user_agent.is_mobile:
            return DeviceTypeChoices.MOBILE
        elif user_agent.is_tablet:
            return DeviceTypeChoices.TABLET
        elif user_agent.is_pc:
            return DeviceTypeChoices.PC
        elif user_agent.is_bot:
            return DeviceTypeChoices.BOT
        else:
            return DeviceTypeChoices.UNKNOWN

    @staticmethod
    def get_browser_info(user_agent: UserAgent) -> str:
        """
        Extracts the browser type from the user agent.
        """
        browser_family: str = user_agent.browser.family.lower()
        for choice in BrowserTypeChoices:
            if browser_family == choice.value:
                return choice
        return BrowserTypeChoices.UNKNOWN

    @staticmethod
    def get_os_info(user_agent: UserAgent) -> str:
        """
        Extracts the operating system from the user agent.
        """
        os_family: str = user_agent.os.family.lower()
        for choice in OSTypeChoices:
            if os_family == choice.value:
                return choice
        return OSTypeChoices.UNKNOWN

    @staticmethod
    def record_click(request: Request, alias: URL) -> None:
        """
        Records a click event for a given shortened URL.
        Extracts user metadata such as IP, browser, OS, and device type.
        """
        ip_address: str = request.META.get("REMOTE_ADDR", "0.0.0.0")
        user_agent_string: str = request.META.get("HTTP_USER_AGENT", "")

        user_agent: UserAgent = parse(user_agent_string)
        browser: str = URLService.get_browser_info(user_agent)
        os: str = URLService.get_os_info(user_agent)
        device: str = URLService.get_device_info(user_agent)

        Click.objects.create(
            url=alias,
            ip_address=ip_address,
            browser=browser,
            os=os,
            device=device,
        )
