from django.db import models
import uuid


class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    identifier = models.TextField(max_length=200)
    text = models.TextField(max_length=500)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return str(self.identifier)

    def get_question(self):
        return self.questions
