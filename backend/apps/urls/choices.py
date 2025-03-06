"""Choices for Urls App."""

from django.db import models


class PrivacyChoices(models.TextChoices):
    PUBLIC = "public", "Public"
    PRIVATE = "private", "Private"


class DeviceTypeChoices(models.TextChoices):
    MOBILE = "mobile", "Mobile"
    TABLET = "tablet", "Tablet"
    PC = "pc", "PC"
    BOT = "bot", "Bot"
    UNKNOWN = "unknown", "Unknown"


class BrowserTypeChoices(models.TextChoices):
    CHROME = "chrome", "Chrome"
    FIREFOX = "firefox", "Firefox"
    SAFARI = "safari", "Safari"
    MOBILE_SAFARI = "mobile_safari", "Mobile Safari"
    EDGE = "edge", "Edge"
    OPERA = "opera", "Opera"
    INTERNET_EXPLORER = "internet_explorer", "Internet Explorer"
    UNKNOWN = "unknown", "Unknown"


class OSTypeChoices(models.TextChoices):
    WINDOWS = "windows", "Windows"
    MACOS = "macos", "macOs"
    LINUX = "linux", "Linux"
    ANDROID = "android", "Android"
    IOS = "ios", "iOS"
    BLACKBERRY_OS = "blackberry_os", "Blackberry OS"
    CHROME_OS = "chrome_os", "Chrome OS"
    UNKNOWN = "unknown", "Unknown"
