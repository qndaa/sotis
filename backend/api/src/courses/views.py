from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Course
from .serializers import CourseSerializer


class CourseViewSet(ModelViewSet):
    queryset = Course.objects.all()
    permission_classes = (IsAuthenticated, )
    serializers = {'default': CourseSerializer}

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers.get('default'))

    def create(self, request, *args, **kwargs):
        user = request.user
        data_copy = request.data.copy()
        if not user.is_superuser:
            data_copy['teachers'] = [user.id]
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data_copy)
        serializer.save()
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not request.user.is_superuser:
            queryset = queryset.filter(teachers__id=request.user.id)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data)
