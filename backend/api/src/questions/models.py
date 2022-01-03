from typing import List

from django.db import models
import uuid
from ..answers.models import Answer
from ..users.models import User


class Domain(models.Model):
    name = models.TextField(max_length=100)

    def __str__(self):
        return self.name


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    identifier = models.TextField(max_length=200, null=True, blank=True)
    time_dependant = models.BooleanField()
    text = models.TextField(max_length=500)
    min_choices = models.IntegerField(blank=True, null=True)
    max_choices = models.IntegerField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    max_correct_answers = models.IntegerField(default=1)
    all_answers = models.ManyToManyField(Answer, related_name="questions", blank=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True
    )
    domain = models.ForeignKey(
        Domain, on_delete=models.CASCADE, blank=True, null=True
    )

    def answered_correctly(self, answers: List[Answer]) -> bool:
        correct_answers = [answer for answer in answers if answer.is_correct]
        return self.max_correct_answers == len(correct_answers)

    def calculate_points(self, answers: List[Answer]) -> float:
        correct_answers = [answer for answer in answers if answer.is_correct]
        return (self.value / (self.max_correct_answers/len(correct_answers))) if len(correct_answers) > 0 else 0
