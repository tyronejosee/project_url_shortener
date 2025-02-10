"""Views for Urls App."""

from django.shortcuts import get_object_or_404, redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import URL
from .serializers import URLSerializer


class URLCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = URLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class URLRedirectView(APIView):
    def get(self, request, short_url, *args, **kwargs):
        url = get_object_or_404(URL, short_url=short_url)
        return redirect(url.original_url, permanent=True)
