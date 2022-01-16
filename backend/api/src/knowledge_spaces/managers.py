from django.db.models import QuerySet

from src.tests.models import Test


class KnowledgeSpaceQuerySet(QuerySet):
    def create(self, name, test, computed, **kwargs):
        found_instance = self.filter(test_id=test).filter(computed=computed)
        if found_instance.exists():
            instance = found_instance.first()
            instance.name = name
            instance.test = test
            instance.computed = computed
            instance.connections.clear()
            instance.save()
            return instance
        created = super(KnowledgeSpaceQuerySet, self).create(name=name, test=test, computed=computed)
        return created

    def retrieve_drawn(self, test_id: str):
        found_qs = self.filter(test_id=test_id).filter(computed=False)
        test = Test.objects.get(id=test_id)
        return (self.create('', test, False), found_qs.first())[found_qs.exists()]
