from django.db import models

from ..questions.models import Question
from ..tests.models import Test
from ..connections.models import Connection, DomainConnection
from .managers import KnowledgeSpaceQuerySet


class KnowledgeSpace(models.Model):
    name = models.TextField(max_length=100, blank=True, null=True)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, blank=True, null=True)
    connections = models.ManyToManyField(Connection, blank=True, null=True)
    domain_connections = models.ManyToManyField(DomainConnection, blank=True, null=True)
    computed = models.BooleanField(default=False)

    objects = KnowledgeSpaceQuerySet.as_manager()
