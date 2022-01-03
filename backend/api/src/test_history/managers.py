from django.db.models import QuerySet


class TestHistoryQuerySet(QuerySet):
    def create(self, **kwargs):
        instance = self.filter(student=kwargs.get("student")).filter(test=kwargs.get("test"))
        if instance.exists():
            instance.first().delete()
        return super().create(**kwargs)
