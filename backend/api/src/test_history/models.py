from django.db import models
import uuid
from src.users.models import User
from .constants import StatusOfTestList
from src.answers.models import Answer
from src.tests.models import Test


class TestHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    total_points = models.FloatField(blank=True, null=True)
    mark = models.IntegerField(blank=True, null=True)
    test_status = models.CharField(
        max_length=10,
        choices=StatusOfTestList.choices,
        default=StatusOfTestList.NA,
    )
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    given_answers = models.ManyToManyField(Answer)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.date)

    class Meta:
        verbose_name_plural = "Test histories"
