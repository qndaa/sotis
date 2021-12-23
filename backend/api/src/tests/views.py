from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.mixins import ListModelMixin
from .models import Test
from .serializers import FetchTestSerializer, TestSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

from ..knowledge_spaces.models import KnowledgeSpace
from ..questions.models import Question
from ..questions.serializers import FetchQuestionSerializer


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

    @action(detail=True, methods={'GET'}, url_path=r"next/?(?P<current_question_id>[^/.]*)")
    def next_question(self, request, pk, current_question_id=None):
        test = self.get_queryset().filter(id=pk).first()
        if not current_question_id:
            domain = KnowledgeSpace.objects.filter(test=test.id).first().domain_connections.first().from_node
            return self.extract_question_for_domain(test, domain)
        current_domain = Question.objects.filter(id=current_question_id).first().domain
        connection = KnowledgeSpace.objects.filter(test=test.id).first().domain_connections.filter(
            from_node__id=current_domain.id
        ).first()
        next_domain = connection.to_node
        return self.extract_question_for_domain(test, next_domain)

    def extract_question_for_domain(self, test, next_domain):
        questions = []
        for section in test.sections.all():
            for question in section.questions.all():
                questions.append(question)
        filtered_questions = filter(lambda q: q.domain.id == next_domain.id, questions)
        serializer = FetchQuestionSerializer(list(filtered_questions)[0])
        return Response(serializer.data)
