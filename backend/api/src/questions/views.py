from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Question, Domain
from .serializers import FetchQuestionSerializer, QuestionSerializer, DomainSerializer
from rest_framework.response import Response
from rest_framework import status


class QuestionViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Question.objects.all()
    serializers = {
        "default": QuestionSerializer,
        "fetch": FetchQuestionSerializer,
        "list": FetchQuestionSerializer,
    }

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers["default"])

    def create(self, request):
        if not request.user.is_staff or not request.user.is_superuser:
            return Response(
                {"message": "Only professors can create questions!"},
                status=status.HTTP_401_FORBIDDEN,
            )
        serializer_class = self.get_serializer_class()
        data_copy = request.data.copy()
        data_copy["created_by"] = request.user.id
        serializer = serializer_class(data=data_copy)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = Question.objects.filter(created_by=request.user.id)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data)

    # @action(
    #     methods=["POST", "DELETE"],
    #     detail=False,
    #     url_path=r"add_answer",
    # )
    # def add_answer(self, request):
    #     serializer = self.get_serializer(request.data)
    #     serializer.is_valid(raise_exception=True)
    #     movie = Movie.objects.get(id=serializer.data["movie"])

    #     if request.method == "POST":
    #         request.user.watch_list.add(movie)
    #     else:
    #         request.user.watch_list.remove(movie)

    #     return Response(
    #         status=status.HTTP_200_OK,
    #     )


class DomainViewSet(ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
