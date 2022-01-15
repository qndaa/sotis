from django_filters import FilterSet

from .models import Test


class TestFilters(FilterSet):
    class Meta:
        model = Test
        fields = '__all__'
