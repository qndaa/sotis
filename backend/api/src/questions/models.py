from django.db import models
import uuid
from src.answers.models import Answer


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    identifier = models.TextField(max_length=200)
    time_dependant = models.BooleanField()
    text = models.TextField(max_length=500)
    min_choices = models.IntegerField(blank=True, null=True)
    max_choices = models.IntegerField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    correct_answer = models.ForeignKey(
        Answer, on_delete=models.CASCADE, related_name="correct"
    )
    all_answers = models.ManyToManyField(Answer, related_name="all_answers", blank=True)
