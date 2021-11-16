from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .models import Answer
from .serializers import AnswerSerializer


class AnswerViewSet(ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
