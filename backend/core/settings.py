"""
Django settings for core project.
"""

import os
import sys
from pathlib import Path

import environ
from datetime import timedelta

BASE_DIR: Path = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env("backend/.env")

# Project

SITE_NAME = "URL Shortener"
DOMAIN = env.str("DOMAIN")
DEBUG = env.bool("DEBUG")
SECRET_KEY = env.str("SECRET_KEY")
VERIFICATION_CODE = env.str("VERIFICATION_CODE")
WSGI_APPLICATION = "core.wsgi.application"
ROOT_URLCONF = "core.urls"

# Apps

BASE_APPS: list[str] = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
PROJECT_APPS: list[str] = [
    "apps.communications",
    "apps.domains",
    "apps.subscriptions",
    "apps.urls",
    "apps.users",
    "apps.utils",
]
THIRD_APPS: list[str] = [
    "rest_framework",
    "djoser",
    "corsheaders",
    "social_django",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "django_filters",
    "drf_spectacular",
    "drf_spectacular_sidecar",
]
INSTALLED_APPS: list[str] = BASE_APPS + PROJECT_APPS + THIRD_APPS

MIDDLEWARE: list[str] = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # "apps.utils.middleware.VerificationCodeMiddleware",
]

TEMPLATES: list[dict] = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Databases

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

if "test" in sys.argv:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASES: dict = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env("POSTGRES_DB"),
            "USER": env("POSTGRES_USER"),
            "PASSWORD": env("POSTGRES_PASSWORD"),
            "HOST": env("POSTGRES_HOST"),
            "PORT": env("POSTGRES_PORT"),
        }
    }

# Internationalization

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"

# Api settings

APPEND_SLASH = False
REST_FRAMEWORK: dict = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "apps.users.authentication.CustomJWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_CONTENT_LANGUAGE": "en",
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    # "DEFAULT_THROTTLE_CLASSES": [
    #     "rest_framework.throttling.AnonRateThrottle",
    #     "rest_framework.throttling.UserRateThrottle",
    # ],
    # "DEFAULT_THROTTLE_RATES": {
    #     "anon": "3/second",
    #     "user": "60/minute",
    #     "daily": "1000/day",
    # },
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "DEFAULT_FILTER_BACKENDS": [
        "rest_framework.filters.SearchFilter",
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "NUM_PROXIES": None,
    "PAGE_SIZE": 25,
    "SEARCH_PARAM": "q",
    "ORDERING_PARAM": "order",
}

# Domains

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

# Cors

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]
CORS_ALLOW_METHODS: list[str] = ["GET", "POST", "PUT", "PATCH", "DELETE"]
CORS_ALLOW_HEADERS: list[str] = [
    "Authorization",
    "Content-Type",
    "accept",
    "accept-encoding",
    "content-disposition",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
    "X-Verification-Code",
]

# Auth, Djoser, rest_framework_simple_jwt

AUTH_USER_MODEL = "users.User"

AUTH_PASSWORD_VALIDATORS: list[dict] = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

DJOSER: dict = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "USERNAME_CHANGED_EMAIL_CONFIRMATION": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
    "SET_USERNAME_RETYPE": True,
    "SET_PASSWORD_RETYPE": True,
    "SEND_ACTIVATION_EMAIL": False,  # True
    "SEND_CONFIRMATION_EMAIL": False,  # True
    "PASSWORD_RESET_CONFIRM_RETYPE": True,  # True
    "TOKEN_MODEL": None,
    "ACTIVATION_URL": "activation/{uid}/{token}",
    "PASSWORD_RESET_CONFIRM_URL": "password-reset/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "email/reset/{uid}/{token}",
    "SOCIAL_AUTH_TOKEN_STRATEGY": "djoser.social.token.jwt.TokenStrategy",
    "SOCIAL_AUTH_ALLOWED_REDIRECT_URIS": env.list("REDIRECT_URLS"),
    "SERIALIZERS": {
        "user_create": "apps.users.serializers.UserWriteSerializer",
        "user": "apps.users.serializers.UserReadSerializer",
        "current_user": "apps.users.serializers.UserReadSerializer",
        "user_delete": "djoser.serializers.UserDeleteSerializer",
    },
}

SIMPLE_JWT: dict = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": False,  # True (Blacklist after rotation)
    "BLACKLIST_AFTER_ROTATION": False,  # True (Blacklist after rotation)
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": "",
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}

AUTHENTICATION_BACKENDS: list[str] = [
    "social_core.backends.google.GoogleOAuth2",
    "social_core.backends.facebook.FacebookOAuth2",
    "django.contrib.auth.backends.ModelBackend",
]

# Oauth

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env.str("GOOGLE_AUTH_KEY")
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env.str("GOOGLE_AUTH_SECRET_KEY")
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE: list[str] = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
]
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA: list[str] = ["first_name", "last_name"]
SOCIAL_AUTH_FACEBOOK_KEY = env.str("FACEBOOK_AUTH_KEY")
SOCIAL_AUTH_FACEBOOK_SECRET = env.str("FACEBOOK_AUTH_SECRET_KEY")
SOCIAL_AUTH_FACEBOOK_SCOPE: list[str] = ["email"]
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS: dict[str, str] = {
    "fields": "email, first_name, last_name",
}

# Cookies

AUTH_COOKIE = "access"
AUTH_ACCESS_COOKIE_MAX_AGE = SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]
AUTH_REFRESH_COOKIE_MAX_AGE = SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]
AUTH_COOKIE_SECURE = env.bool("AUTH_COOKIE_SECURE")
AUTH_COOKIE_HTTP_ONLY = True
AUTH_COOKIE_PATH = "/"
AUTH_COOKIE_SAMESITE = "Lax"  # None in Prod.

# HTTPs

# SECURE_SSL_REDIRECT = True
# SECURE_HSTS_SECONDS = 31536000
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True

# Notifications

DISCORD_WEBHOOKS: dict = {
    "support": env.str("DISCORD_SUPPORT_WEBHOOK"),
    "feedback": env.str("DISCORD_FEEDBACK_WEBHOOK"),
    "donation": env.str("DISCORD_DONATION_WEBHOOK"),
}

# Platforms

LEMON_SQUEEZY_SECRET_KEY = env.str("LEMON_SQUEEZY_SECRET_KEY")
LEMON_SQUEEZY_TOKEN = env.str("LEMON_SQUEEZY_TOKEN")
KOFI_SECRET_KEY = env.str("KOFI_SECRET_KEY")

# Documentation

SPECTACULAR_SETTINGS: dict = {
    "TITLE": env.str("PROYECT_NAME"),
    "DESCRIPTION": (
        "The Shortened URL API provides a set of endpoints to create, "
        "manage, and retrieve shortened URLs. "
        "This API enables users to shorten long URLs, "
        "track their usage, and delete them if needed. "
        "It offers an easy-to-use interface for developers "
        "and users to integrate URL shortening features into "
        "their applications or websites."
    ),
    "VERSION": "v1",
    "LICENSE": {
        "name": env.str("LICENCE_NAME"),
        "url": env.str("LICENCE_URL"),
    },
    "CONTACT": {
        "name": env.str("CONTACT_NAME"),
        "url": env.str("CONTACT_URL"),
    },
    "SERVE_INCLUDE_SCHEMA": False,
    "SWAGGER_UI_DIST": "SIDECAR",
    "SWAGGER_UI_FAVICON_HREF": "SIDECAR",
    "REDOC_DIST": "SIDECAR",
    "REDOC_UI_SETTINGS": {
        "hideHostname": True,
        "theme": {"colors": {"primary": {"main": "#16FF00"}}},
    },
    "TAGS": [
        {"name": "urls", "description": "Operations related to urls"},
        {"name": "clicks", "description": "Operations related to clicks"},
        {"name": "groups", "description": "Operations related to groups"},
        {"name": "plans", "description": "Operations related to plans."},
        {"name": "communications", "description": "Operations related to comm."},
        {"name": "users", "description": "Operations related to users"},
        {"name": "socials", "description": "Operations related to socials"},
        {"name": "tokens", "description": "Operations related to tokens"},
    ],
}

# Static and Media
STATIC_URL: str = "/static/"
STATIC_ROOT: str = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS: list[str] = [
    os.path.join(BASE_DIR, "static"),
]

MEDIA_URL: str = "/media/"
MEDIA_ROOT: str = os.path.join(BASE_DIR, "media")

# Email
EMAIL_BACKEND: str = "django.core.mail.backends.console.EmailBackend"

if not DEBUG:
    # Storage
    AWS_S3_ACCESS_KEY_ID = env("AWS_S3_ACCESS_KEY_ID")
    AWS_S3_SECRET_ACCESS_KEY = env("AWS_S3_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
    AWS_S3_REGION_NAME = env("AWS_S3_REGION_NAME")
    AWS_S3_ENDPOINT_URL: str = f"https://{AWS_S3_REGION_NAME}.digitaloceanspaces.com"
    AWS_S3_OBJECT_PARAMETERS: dict[str, str] = {"CacheControl": "max-age=86400"}
    AWS_DEFAULT_ACL = "public-read"
    AWS_LOCATION = "static"
    AWS_MEDIA_LOCATION = "media"
    AWS_S3_CUSTOM_DOMAIN = env("AWS_S3_CUSTOM_DOMAIN")
    STORAGES: dict[str, dict[str, str]] = {
        "default": {
            "BACKEND": "custom_storages.CustomS3Boto3Storage",
        },
        "staticfiles": {
            "BACKEND": "storages.backends.s3boto3.S3StaticStorage",
        },
    }

    # Email
    EMAIL_BACKEND = "django_ses.SESBackend"
    DEFAULT_FROM_EMAIL = env("AWS_SES_FROM_EMAIL")
    AWS_SES_ACCESS_KEY_ID = env("AWS_SES_ACCESS_KEY_ID")
    AWS_SES_SECRET_ACCESS_KEY = env("AWS_SES_SECRET_ACCESS_KEY")
    AWS_SES_REGION_NAME = env("AWS_SES_REGION_NAME")
    AWS_SES_REGION_ENDPOINT = f"email.{AWS_SES_REGION_NAME}.amazonaws.com"
    AWS_SES_FROM_EMAIL = env("AWS_SES_FROM_EMAIL")
    USE_SES_V2 = True
