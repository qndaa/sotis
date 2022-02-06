from django.db import models


class Problem(models.Model):
    name = models.TextField(max_length=255)