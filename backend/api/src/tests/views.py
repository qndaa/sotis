from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Test
from .serializers import TestSerializer


class TestViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Test.objects.all()
    serializer_class = TestSerializer
