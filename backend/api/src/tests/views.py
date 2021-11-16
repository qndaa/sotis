from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.mixins import ListModelMixin
from .models import Test
from .serializers import FetchTestSerializer, TestSerializer
from rest_framework.response import Response


class TestViewSet(ModelViewSet, ListModelMixin):
    ModelViewSet.permission_classes = (AllowAny, )
    permission_classes = (AllowAny,)
    queryset = Test.objects.all()
    serializers = {
        "default": TestSerializer,
        "retrieve": FetchTestSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers["default"])

    def create(self, request):
        data_copy = request.data.copy()
        data_copy["author"] = request.user.id
        print(data_copy)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data_copy)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def retrieve(self, request, pk):
        serializer_class = self.get_serializer_class()
        queryset = self.get_queryset().get(id=pk)
        serializer = serializer_class(queryset)
        return Response(serializer.data)
