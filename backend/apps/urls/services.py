"""Services for Urls App."""

import random
import string

from django.db.models import Count
from django.db.models.functions import TruncDate
from rest_framework.request import Request
from user_agents import parse
from user_agents.parsers import UserAgent

from apps.users.models import User
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


class ClickService:
    """
    Service for Click model.
    """

    @staticmethod
    def get_clicks_summary(user: User) -> dict:
        """
        Retrieves a summary of clicks for the given user.
        """
        clicks = Click.objects.filter(url__user=user)

        # Group the clicks by date (day)
        click_data = clicks.annotate(date=TruncDate("created_at"))

        # Group by date
        clicks_by_date = (
            click_data.values("date")
            .annotate(click_count=Count("id"))
            .order_by("date")
        )

        # Group by device, browser, and operating system
        clicks_by_device = (
            click_data.values("device")
            .annotate(device_count=Count("id"))
            .order_by("device")
        )
        clicks_by_browser = (
            click_data.values("browser")
            .annotate(browser_count=Count("id"))
            .order_by("browser")
        )
        clicks_by_os = (
            click_data.values("os")
            .annotate(os_count=Count("id"))
            .order_by("os")
        )

        # Mapping dictionaries for readable labels
        device_labels = {
            choice.value: choice.label
            for choice in DeviceTypeChoices
        }
        browser_labels = {
            choice.value: choice.label
            for choice in BrowserTypeChoices
        }
        os_labels = {
            choice.value: choice.label
            for choice in OSTypeChoices
        }

        # Initialize counts with labels
        devices = {device_labels[device]: 0 for device in device_labels}
        browsers = {browser_labels[browser]: 0 for browser in browser_labels}
        os_types = {os_labels[os]: 0 for os in os_labels}

        # Count clicks by type using labels
        for item in clicks_by_device:
            device_name = device_labels.get(item["device"], item["device"])
            devices[device_name] = item["device_count"]

        for item in clicks_by_browser:
            browser_name = browser_labels.get(item["browser"], item["browser"])
            browsers[browser_name] = item["browser_count"]

        for item in clicks_by_os:
            os_name = os_labels.get(item["os"], item["os"])
            os_types[os_name] = item["os_count"]

        # Create list of click data
        clicks_by_date_list = [
            {"date": str(item["date"]), "clicks": item["click_count"]}
            for item in clicks_by_date
        ]

        return {
            "clicks": clicks_by_date_list,
            "device": [
                {"name": name, "value": count}
                for name, count in devices.items()
            ],
            "browser": [
                {"name": name, "value": count}
                for name, count in browsers.items()
            ],
            "os": [
                {"name": name, "value": count}
                for name, count in os_types.items()
            ],
        }
