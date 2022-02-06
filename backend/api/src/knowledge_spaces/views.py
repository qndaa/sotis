import datetime

import pandas as pd
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import KnowledgeSpaceFilter
from .serializers import CreateKnowledgeSpaceSerializer, ListKnowledgeSpaceSerializer
from .models import KnowledgeSpace
from ..connections.models import Connection, DomainConnection
from ..kst.learning_spaces.kst import iita
from ..questions.models import Question, Domain
from ..test_history.models import TestHistory
from ..tests.models import Test


def create_connections(data_frame, dynamic_list):
    new_connections = data_frame.get("implications")
    created_connections = []
    for connection in new_connections:
        from_node = Question.objects.get(id=dynamic_list[connection[0]].get("question_id")).domain.id
        to_node = Question.objects.get(id=dynamic_list[connection[1]].get("question_id")).domain.id
        instance = DomainConnection.objects.create(
            from_node=Domain.objects.filter(id=from_node).first(),
            to_node=Domain.objects.filter(id=to_node).first()
        )
        if instance:
            created_connections.append(instance)
    return created_connections


def create_knowledge_space(connections, test, computed) -> KnowledgeSpace:
    instance = KnowledgeSpace.objects.create(
        name="Knowledge space created on {}".format(datetime.datetime.today()),
        test=Test.objects.get(id=test),
        computed=computed)
    for connection in connections:
        instance.domain_connections.add(connection.id)
    return instance


def compute(test_id):
    dynamic_list = []
    test_histories = TestHistory.objects.filter(test=test_id)
    if not test_histories.exists():
        return KnowledgeSpace.objects.create(name='', test=Test.objects.get(id=test_id), computed=True)

    test_history = test_histories.first()
    all_questions = []
    all_answers = []

    for section in test_history.test.sections.all():
        for index, question in enumerate(section.questions.all()):
            dynamic_list.append(
                {"index": index, "question_id": question.id, "values": []}
            )
            all_questions.append(question)

    for test_history in test_histories:
        for answer in test_history.given_answers.all():
            all_answers.append(answer)

    for answer in all_answers:
        item_index = 1000000
        found = False
        for index, item in enumerate(dynamic_list):
            if item.get("question_id") == answer.get_question().first().id:
                item_index = index
                found = True
        if found:
            dynamic_list[item_index] = {
                "index": dynamic_list[item_index].get("index"),
                "question_id": dynamic_list[item_index].get("question_id"),
                "values": dynamic_list[item_index].get("values") + [1],
            }
        dynamic_list_corrected = {}
        for item in dynamic_list:
            dynamic_list_corrected[item.get("index")] = item.get("values")

    data_frame = pd.DataFrame(dynamic_list_corrected)

    iita_analyzed = iita(data_frame, v=1)
    created_connections = create_connections(iita_analyzed, dynamic_list)
    created_knowledge_space = create_knowledge_space(created_connections, test_id, True)
    return created_knowledge_space


class KnowledgeSpaceViewSet(ModelViewSet):
    serializers = {
        'create': CreateKnowledgeSpaceSerializer,
        'default': ListKnowledgeSpaceSerializer,
        'get_knowledge_space_by_test': ListKnowledgeSpaceSerializer
    }
    queryset = KnowledgeSpace.objects.all()
    filterset_class = KnowledgeSpaceFilter

    def create(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers["default"])

    @action(detail=False, methods=["get"], url_path=r"for-test/(?P<test_id>[^/.]*)")
    def get_knowledge_space_by_test(self, request, test_id):
        computed_knowledge_space = compute(test_id)
        drawn_knowledge_space = KnowledgeSpace.objects.retrieve_drawn(test_id)
        serializer_class = self.get_serializer_class()
        computed_serializer = serializer_class(computed_knowledge_space)
        drawn_serializer = serializer_class(drawn_knowledge_space)
        return Response({'computed': computed_serializer.data, 'drawn': drawn_serializer.data})
