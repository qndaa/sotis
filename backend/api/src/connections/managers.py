from django.db import models


class DomainConnectionQuerySet(models.QuerySet):
    def create(self, **kwargs):
        found = self.filter(from_node__id=kwargs.get("from_node").id).filter(to_node__id=kwargs.get("to_node").id)
        if found.exists():
            found.delete()

        instance = super().create(**kwargs)
        return instance