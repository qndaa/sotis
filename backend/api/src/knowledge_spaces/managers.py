from django.db.models import QuerySet

from src.tests.models import Test


class KnowledgeSpaceQuerySet(QuerySet):
    def create(self, **kwargs):
        found_instance = (self
                          .filter(test_id=kwargs.get("test"))
                          .filter(computed=kwargs.get("computed"))
                          .exclude(test_id__isnull=True))

        if found_instance.exists():
            instance = found_instance.first()
            instance.name = kwargs.get("name")
            if kwargs.get("test"):
                instance.test = kwargs.get("test")
            instance.connections.clear()
            instance.save()
            return instance
        created = super().create(**kwargs)
        return created

    def retrieve_drawn(self, test_id: str):
        found_qs = self.filter(test_id=test_id).filter(computed=False)
        test = Test.objects.get(id=test_id)
        # return (self.create('', test, False), found_qs.first())[found_qs.exists()]
        return found_qs.first() if found_qs.exists() else self.create(name='', test=test, computed=False)
