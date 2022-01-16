from typing import List

from django.db import models
import uuid
from src.users.models import User
from src.sections.models import Section
from src.questions.models import Question
from src.courses.models import Course


class Test(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    identifier = models.TextField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    sections = models.ManyToManyField(Section, blank=True)
    sort_by_ks = models.BooleanField(default=False)
    sort_by_computed_ks = models.BooleanField(default=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, blank=True, null=True)
    expiration_date = models.DateTimeField()
    start_date = models.DateTimeField()

    def __str__(self):
        return self.identifier

    def get_all_questions(self) -> List[Question]:
        all_questions = []
        for section in self.sections.all():
            for question in section.questions.all():
                all_questions.append(question)
        return all_questions
