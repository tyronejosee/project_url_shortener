"""Extensions for Users apps."""

from drf_spectacular.extensions import OpenApiAuthenticationExtension


class CustomJWTAuthenticationScheme(OpenApiAuthenticationExtension):
    """
    OpenAPI authentication extension for CustomJWTAuthentication.

    This class integrates the CustomJWTAuthentication class into
    the OpenAPI schema by specifying the security definition
    for JWT-based authentication.
    """

    target_class: str = "apps.users.authentication.CustomJWTAuthentication"
    name: str = "CustomJWT"

    def get_security_definition(self, auto_schema) -> dict[str, str]:
        return {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
