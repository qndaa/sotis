from django_filters import FilterSet, CharFilter

from .models import TestHistory


class TestHistoryFilter(FilterSet):
    course = CharFilter(field_name='test__course')

    class Meta:
        model = TestHistory
        fields = '__all__'
