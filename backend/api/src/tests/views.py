import random
from typing import List

from django.template import loader
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.mixins import ListModelMixin

from .filters import TestFilters
from .models import Test
from .serializers import FetchTestSerializer, TestSerializer, CreateTestSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

from ..knowledge_spaces.models import KnowledgeSpace
from ..questions.models import Question
from ..questions.serializers import FetchQuestionSerializer


class TestViewSet(ModelViewSet, ListModelMixin):
    ModelViewSet.permission_classes = (AllowAny, )
    permission_classes = (AllowAny,)
    queryset = Test.objects.all()
    filterset_class = TestFilters
    serializers = {
        "default": TestSerializer,
        "retrieve": FetchTestSerializer,
        "create": CreateTestSerializer
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

    @action(detail=True, methods={'GET'}, url_path=r"get-ims")
    def get_ims(self, request, pk):
        test = self.get_queryset().filter(id=pk).first()
        template = loader.get_template('ims.xml')
        context = {
            'test_name': test.identifier,
            'items': test.get_all_questions(),
            'sections': test.sections.all()
        }
        return Response({'template': template.render(context, request)})

    @action(detail=True, methods={'GET'}, url_path=r"next/?(?P<current_question_id>[^/.]*)/?(?P<reverse>[^/.]*)")
    def next_question(self, request, pk, current_question_id=None, reverse=False):
        test = self.get_queryset().filter(id=pk).first()
        # if not current_question_id:
        #     return self.first_question(current_question_id, test)

        # current_domain = Question.objects.filter(id=current_question_id).first().domain
        # connection = KnowledgeSpace.objects.filter(test=test.id).first().domain_connections.filter(
        #     from_node__id=current_domain.id
        # ).first()
        # next_domain = connection.to_node
        # return self.extract_question_for_domain(test, next_domain)

        sorted_questions = self.get_sorted_questions_by_computed(test) if test.sort_by_computed_ks else self.get_sorted_questions_random(test)

        if not current_question_id:
            selected_question = sorted_questions[0]
        else:
            sorted_question_ids = [str(question.id) for question in sorted_questions]
            index = sorted_question_ids.index(current_question_id)
            next_index = index - 1 if reverse else index + 1
            if reverse and next_index < 0:
                return Response("You have reached the first question!", status=status.HTTP_404_NOT_FOUND)
            if index + 1 >= len(sorted_questions) and not reverse:
                return Response("You have reached the last question!", status=status.HTTP_404_NOT_FOUND)

            selected_question = sorted_questions[next_index]

        serializer = FetchQuestionSerializer(selected_question, context={"count": len(sorted_questions)})
        return Response(serializer.data)


    def first_question(self, current_question_id, test):
        domain = KnowledgeSpace.objects.filter(test=test.id).first().domain_connections.first().from_node
        return self.extract_question_for_domain(test, domain)

    def get_sorted_domains(self, test):
        domain_connections = KnowledgeSpace.objects.filter(test=test.id).first().domain_connections
        sorted_domains = set()
        sorted_domains.add(domain_connections.first().from_node.id)
        for connection in domain_connections.all():
            sorted_domains.add(connection.to_node.id)
        return sorted_domains

    def get_sorted_questions_random(self, test) -> List[Question]:
        return list(question for question in test.get_all_questions())

    def get_sorted_questions_by_computed(self, test):
        sorted_questions = set()
        for domain_id in self.get_sorted_domains(test):
            questions = self.extract_question_for_domain_id(test, domain_id)
            for question in questions:
                sorted_questions.add(question)
        return list(sorted_questions)


    def extract_question_for_domain(self, test, next_domain):
        questions = []
        for section in test.sections.all():
            for question in section.questions.all():
                questions.append(question)
        filtered_questions = filter(lambda q: q.domain.id == next_domain.id, questions)
        serializer = FetchQuestionSerializer(list(filtered_questions)[0])
        return Response(serializer.data)

    def extract_question_for_domain_id(self, test, next_domain):
        questions = []
        for section in test.sections.all():
            for question in section.questions.all():
                questions.append(question)
        filtered_questions = filter(lambda q: q.domain.id == next_domain, questions)
        return filtered_questions
