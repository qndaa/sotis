from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .constants import StatusOfTestList
from .filters import TestHistoryFilter
from .models import TestHistory
from .serializers import TestHistorySerializer, ListTestHistorySerializer
from rest_framework.response import Response
from rest_framework.decorators import action
import pandas as pd
import numpy as np

# sys.path.append("kst/learning_spaces/")
from src.kst.learning_spaces.kst import iita

from ..connections.models import Connection
from ..questions.models import Question


def create_connections(data_frame, dynamic_list):
    new_connections = data_frame.get("implications")
    for connection in new_connections:
        Connection.objects.create(
            from_node=Question.objects.get(id=dynamic_list[connection[0]].get("question_id")),
            to_node=Question.objects.get(id=dynamic_list[connection[1]].get("question_id")))


def extract_total_points(test_history: TestHistory) -> float:
    total_points = 0
    for section in test_history.test.sections.all():
        for question in section.questions.all():
            all_answer_ids = list({answer.id for answer in question.all_answers.all()})
            answers_for_question = test_history.given_answers.filter(id__in=all_answer_ids)
            total_points += question.calculate_points(answers_for_question.all())
    return total_points


class TestHistoryViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TestHistorySerializer
    queryset = TestHistory.objects.all()
    filterset_class = TestHistoryFilter

    def retrieve(self, request):
        queryset = TestHistory.objects.filter(student_id=request.id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data_copy = request.data.copy()
        data_copy["test_status"] = StatusOfTestList.FINISHED
        data_copy["student"] = request.user.id
        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        instance.total_points = extract_total_points(instance)
        instance.save()
        return Response({"test_history": serializer.data, "total_points": instance.total_points, "max_points": instance.calculate_max_points()})

    @action(detail=False, methods=["get"], url_path=r"for-student/?(?P<student_id>[^/.]*)")
    def get_for_student(self, request, student_id):
        queryset = self.filter_queryset(self.get_queryset().filter(student=student_id))
        serializer = ListTestHistorySerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"], url_path=r"correct-answers-for-student/(?P<student_id>[^/.]*)")
    def get_correct_answers_for_student(self, request, pk, student_id):
        instance = self.get_queryset().filter(student=student_id).filter(id=pk)
        if instance.exists():
            return Response({"correct_answers": instance.first().extract_correct_answers()})
        return Response("No answers found!", status=status.HTTP_404_NOT_FOUND)


    @action(detail=True, methods=["get"], url_path=r"connections")
    def get_connections(self, request, pk):
        dynamic_list = []
        test_histories = self.get_queryset().filter(test=pk)
        test_history = test_histories[0]
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

        iita_analized = iita(data_frame, v=1)
        create_connections(iita_analized, dynamic_list)
        return Response(iita_analized)

    def __get_answers_for_question(self, all_given_answers, question):
        answers_for_question = []
        ret_val = []
        print(all_given_answers)

        for answer in all_given_answers:
            if question.all_answers.filter(id=answer.id).exists():
                answers_for_question.append(answer)

        print(answers_for_question)

        for answer in answers_for_question:
            if answer in question.correct_answers.all():
                ret_val.append(1)
            else:
                ret_val.append(0)

        return ret_val
