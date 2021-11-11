from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import TestHistory
from .serializers import TestHistorySerializer
from rest_framework.response import Response


class TestHistoryViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TestHistorySerializer
    queryset = TestHistory.objects.all()

    def retrieve(self, request):
        queryset = TestHistory.objects.filter(student_id=request.id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
