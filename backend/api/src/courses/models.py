from django.db import models

from ..users.models import User


class Course(models.Model):
    name = models.TextField(max_length=255, blank=True, null=True)
    teachers = models.ManyToManyField(User, related_name='teaches_courses')
    students = models.ManyToManyField(User, related_name='takes_courses')
    color = models.TextField(max_length=20, blank=True, null=True)
