from django.db import models
import uuid
from src.users.models import User
from src.sections.models import Section


class Test(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    identifier = models.TextField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    sections = models.ManyToManyField(Section, blank=True)
