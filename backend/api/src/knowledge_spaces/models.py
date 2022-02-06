from django.db import models

from ..problem.models import Problem
from ..questions.models import Question
from ..tests.models import Test
from ..connections.models import Connection, DomainConnection
from .managers import KnowledgeSpaceQuerySet


class KnowledgeSpace(models.Model):
    name = models.TextField(max_length=100, blank=True, null=True)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, blank=True, null=True)
    tests = models.ManyToManyField(Test, related_name='contained_tests', blank=True)
    connections = models.ManyToManyField(Connection, blank=True)
    domain_connections = models.ManyToManyField(DomainConnection, blank=True)
    computed = models.BooleanField(default=False)
    problem = models.ForeignKey(Problem, on_delete=models.DO_NOTHING, blank=True, null=True)

    objects = KnowledgeSpaceQuerySet.as_manager()
