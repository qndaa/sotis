import uuid
from django.db import models
from .managers import DomainConnectionQuerySet
from ..questions.models import Question, Domain
from ..tests.models import Test


class Connection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    from_node = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="start_question"
    )
    to_node = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="end_question"
    )


class DomainConnection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    from_node = models.ForeignKey(
        Domain, on_delete=models.CASCADE, related_name="start_domain"
    )
    to_node = models.ForeignKey(
        Domain, on_delete=models.CASCADE, related_name="end_domain"
    )
    test = models.ForeignKey(Test, on_delete=models.CASCADE, blank=True, null=True)

    objects = DomainConnectionQuerySet.as_manager()
