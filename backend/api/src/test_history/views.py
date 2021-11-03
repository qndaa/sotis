from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import TestHistory
from .serializers import TestHistorySerializer


class TestHistoryViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TestHistorySerializer
    queryset = TestHistory.objects.all()
