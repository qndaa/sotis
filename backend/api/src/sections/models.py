from django.db import models
import uuid
from src.questions.models import Question
from src.users.models import User


class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    identifier = models.TextField(max_length=200)
    title = models.TextField(max_length=200)
    questions = models.ManyToManyField(Question, related_name="questions")
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True
    )
