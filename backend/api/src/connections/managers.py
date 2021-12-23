from django.db import models


class DomainConnectionQuerySet(models.QuerySet):
    def create(self, **kwargs):
        print(kwargs.get("to_node").id)
        found = self.filter(from_node__id=kwargs.get("from_node").id).filter(to_node__id=kwargs.get("to_node").id)
        if found.count() == 0:
            return super().create(**kwargs)

        return None
