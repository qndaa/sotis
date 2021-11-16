from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.mixins import ListModelMixin
from .models import Test
from .serializers import TestSerializer


class TestViewSet(ModelViewSet, ListModelMixin):
    ModelViewSet.permission_classes = (AllowAny, )
    permission_classes = (AllowAny,)
    queryset = Test.objects.all()
    serializer_class = TestSerializer

