from django.db.models import QuerySet


class TestHistoryQuerySet(QuerySet):
    def create(self, **kwargs):
        user = kwargs.get("student")

        if user.is_superuser:
            return self.create_for_superuser(**kwargs)

        return self.create_for_student(**kwargs)

    def create_for_superuser(self, **kwargs):
        instance = self.filter(student=kwargs.get("student")).filter(test=kwargs.get("test"))

        if instance.exists():
            instance.first().delete()
        return super().create(**kwargs)

    def create_for_student(self, **kwargs):
        instance = self.filter(student=kwargs.get("student")).filter(test=kwargs.get("test"))
        if instance.exists():
            return instance

        return super().create(**kwargs)
