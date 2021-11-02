from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Section
from .serializers import SectionSerializer


class SectionViewSet(ModelViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.all()
    permission_classes = (IsAuthenticated,)
