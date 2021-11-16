from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.mixins import ListModelMixin
from .models import Test
from .serializers import TestSerializer
from rest_framework.response import Response


class TestViewSet(ModelViewSet, ListModelMixin):
    ModelViewSet.permission_classes = (AllowAny, )
    permission_classes = (AllowAny,)
    queryset = Test.objects.all()
    serializer_class = TestSerializer

    def create(self, request):
        data_copy = request.data.copy()
        data_copy["author"] = request.user.id
        print(data_copy)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data_copy)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
