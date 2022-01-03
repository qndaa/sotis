from typing import List

from django.db import models
import uuid
from src.users.models import User
from .constants import StatusOfTestList
from src.answers.models import Answer
from src.tests.models import Test

from .managers import TestHistoryQuerySet


class TestHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    total_points = models.FloatField(blank=True, null=True)
    test_status = models.CharField(
        max_length=10,
        choices=StatusOfTestList.choices,
        default=StatusOfTestList.NA,
    )
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    given_answers = models.ManyToManyField(Answer)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True)

    objects = TestHistoryQuerySet.as_manager()

    def __str__(self):
        return str(self.date)

    def calculate_max_points(self) -> float:
        all_questions = self.test.get_all_questions()
        return sum([question.value for question in all_questions])

    def extract_correct_answers(self) -> List[str]:
        questions_correctly_answered = []
        for section in self.test.sections.all():
            for question in section.questions.all():
                all_answer_ids = list({answer.id for answer in question.all_answers.all()})
                answers_for_question = self.given_answers.filter(id__in=all_answer_ids)
                if question.answered_correctly(answers_for_question.all()):
                    questions_correctly_answered.append(question)
        return [question.id for question in questions_correctly_answered]


        correct_answers = self.given_answers.filter(is_correct=True).all()
        return [answer.id for answer in correct_answers]

    class Meta:
        verbose_name_plural = "Test histories"
