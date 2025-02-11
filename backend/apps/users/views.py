"""Views for Users App."""

from djoser.social.views import ProviderAuthView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

# from drf_spectacular.utils import extend_schema_view

# from ....schemas import (
#     token_obtain_pair_schemas,
#     token_refresh_schemas,
#     token_verify_schemas,
#     provider_auth_schemas,
# )


# @extend_schema_view(**token_obtain_pair_schemas)
class TokenObtainPairExtensionView(TokenObtainPairView):
    """
    Extended view for obtaining JWT tokens.

    Extends the standard TokenObtainPairView in `rest_framework_simplejwt.views`
    to include custom schema documentation using drf-spectacular.
    """

    pass


# @extend_schema_view(**token_refresh_schemas)
class TokenRefreshExtensionView(TokenRefreshView):
    """
    Extended view for refreshing JWT tokens.

    Extends the standard TokenRefreshView in `rest_framework_simplejwt.views`
    to include custom schema documentation using drf-spectacular.
    """

    pass


# @extend_schema_view(**token_verify_schemas)
class TokenVerifyExtensionView(TokenVerifyView):
    """
    Extended view for verifying JWT tokens.

    Extends the standard TokenVerifyView in `rest_framework_simplejwt.views`
    to include custom schema documentation using drf-spectacular.
    """

    pass


# @extend_schema_view(**provider_auth_schemas)
class ProviderAuthExtensionView(ProviderAuthView):
    """
    Extended view for handling social authentication provider requests.

    Extends the standard ProviderAuthView `djoser.social.urls`
    to include custom schema documentation using drf-spectacular.
    """

    pass
