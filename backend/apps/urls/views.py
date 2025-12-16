"""Views for Urls App."""

from django.conf import settings
from django.http import HttpResponse, Http404, HttpRequest
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import get_user_model
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema_view

from apps.users.services import UserService
from apps.users.permissions import IsFree, IsBasic, IsPremium
from .models import URL, URLGroup, Click
from .choices import PrivacyChoices
from .services import URLService, ClickService
from .serializers import (
    URLSerializer,
    URLStatsSerializer,
    URLGroupReadSerializer,
    URLGroupWriteSerializer,
    ClickReadSerializer,
)
from .schemas import (
    url_list_schema,
    url_create_schema,
    url_redirect_schema,
    url_delete_schema,
    url_stats_schema,
    url_group_list_create_schema,
    url_group_detail_schema,
    click_list_schema,
    clicks_summary_schema,
)

User = get_user_model()


@extend_schema_view(**url_list_schema)
class URLListView(APIView):
    """
    View for listing shortened URLs.

    Endpoints:
    - GET /api/urls
    """

    permission_classes: list = [IsFree | IsBasic | IsPremium]

    def get(self, request: Request) -> Response:
        urls = URL.objects.filter(user=request.user)
        serializer = URLSerializer(urls, many=True)
        return Response(serializer.data)


@extend_schema_view(**url_create_schema)
class URLCreateView(APIView):
    """
    View to create a shortened URL.

    Endpoints:
    - POST /api/urls/shorten
    """

    permission_classes: list = [AllowAny]

    def post(self, request: Request) -> Response:
        user = UserService.get_or_create_user(request)

        if URLService.check_url_limit(user):
            return Response(
                {"detail": "You have reached the allowed url limit."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = URLSerializer(
            data=request.data,
            context={"user": user},
        )
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema_view(**url_redirect_schema)
class URLRedirectView(APIView):
    """
    View to handle redirection from a shortened URL.

    Endpoints:
    - GET /{alias}
    """

    def get(self, request: Request, alias: str):
        try:
            url_instance = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            return Response(
                {"detail": "Short URL not found."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if url_instance.privacy == PrivacyChoices.PRIVATE:
            password = request.GET.get("password")

            if not password:
                return redirect(f"/verify-password/{alias}")

            if not url_instance.check_password(password):
                return HttpResponse("Incorrect password.", status=403)

        URLService.record_click(request, url_instance)
        return redirect(url_instance.url)


class VerifyPasswordView(TemplateView):
    """
    View to verify the password for a private URL.

    Urls:
    POST /verify-password/{alias}
    """

    template_name = "pages/verify_password.html"

    def get_context_data(self, **kwargs) -> dict:
        alias = self.kwargs.get("alias")
        context = super().get_context_data(**kwargs)
        context["alias_url"] = f"{settings.DOMAIN}/{alias}"
        return context

    def post(
        self,
        request: HttpRequest,
        alias: str,
        *args,
        **kwargs,
    ) -> HttpResponse:
        url_instance = get_object_or_404(URL, alias=alias)
        password = request.POST.get("password", "")

        if url_instance.check_password(password):
            return redirect(f"/{alias}?password={password}")

        return self.render_to_response(
            self.get_context_data(
                error_message="Incorrect password. Please try again.",
            )
        )


@extend_schema_view(**url_delete_schema)
class URLDeleteView(APIView):
    """
    View to delete a shortened URL.

    Endpoints:
    - DELETE /api/urls/{alias}
    """

    def delete(self, request: Request, alias: str) -> Response:
        try:
            url_instance = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            raise NotFound("Short URL not found.")
        url_instance.delete()
        return Response(
            {"detail": "URL deleted."},
            status=status.HTTP_204_NO_CONTENT,
        )


@extend_schema_view(**url_stats_schema)
class URLStatsView(APIView):
    """
    View to retrieve statistics for a shortened URL.

    Endpoints:
    - GET /api/urls/{alias}/stats
    """

    permission_classes: list = [IsFree | IsBasic | IsPremium]

    def get(self, request: Request, alias: str) -> Response:
        try:
            url_instance = URL.objects.get(alias=alias)
        except URL.DoesNotExist:
            raise NotFound("Alias not found.")

        serializer = URLStatsSerializer(url_instance)
        return Response(serializer.data)


@extend_schema_view(**url_group_list_create_schema)
class URLGroupListCreateView(APIView):
    """
    View to list and create URL groups.

    Endpoints:
    - GET /api/groups
    - POST /api/groups
    """

    permission_classes: list = [IsFree | IsBasic | IsPremium]

    def get(self, request: Request) -> Response:
        groups = URLGroup.objects.filter(user=request.user)
        serializer = URLGroupReadSerializer(groups, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = URLGroupWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema_view(**url_group_detail_schema)
class URLGroupDetailView(APIView):
    """
    View to retrieve, update, and delete a specific URL group.

    Endpoints:
    - GET /api/groups/{id}
    - PATCH /api/groups/{id}
    - DELETE /api/groups/{id}
    """

    def get_object(self, group_id: str) -> URLGroup:
        try:
            return URLGroup.objects.get(pk=group_id)
        except URLGroup.DoesNotExist:
            raise Http404

    def get(self, request: Request, group_id: str) -> Response:
        group = self.get_object(group_id)
        serializer = URLGroupReadSerializer(group)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, group_id: str) -> Response:
        group = self.get_object(group_id)
        serializer = URLGroupWriteSerializer(
            group,
            data=request.data,
            partial=True,
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, group_id: str) -> Response:
        group = self.get_object(group_id)
        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema_view(**click_list_schema)
class ClickListView(APIView):
    """
    View to retrieve all clicks for URLs belonging to the auth user.

    Endpoints:
    - GET /api/clicks
    """

    permission_classes: list = [IsFree | IsBasic | IsPremium]

    def get(self, request: Request) -> Response:
        user_urls = URL.objects.get_urls_by_user(request.user)
        clicks = Click.objects.get_clicks_by_urls(user_urls)
        serializer = ClickReadSerializer(clicks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema_view(**clicks_summary_schema)
class ClicksSummaryView(APIView):
    """
    View to retrieve a summary of clicks for the logged-in user's URLs.

    Endpoints:
    - GET /api/clicks/summary
    """

    permission_classes: list = [IsFree | IsBasic | IsPremium]

    def get(self, request: Request, *args, **kwargs) -> Response:
        data = ClickService.get_clicks_summary(request.user)
        return Response(data)
