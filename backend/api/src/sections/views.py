from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Section
from .serializers import SectionSerializer
from rest_framework.response import Response


class SectionViewSet(ModelViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.all()
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        copy = request.data.copy()
        copy["created_by"] = request.user.id
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=copy)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def list(self, request):
        queryset = Section.objects.filter(created_by=request.user.id)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data)
