from django.db.models import QuerySet


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
