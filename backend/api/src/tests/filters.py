from django_filters import FilterSet, CharFilter

from .models import Test


class TestFilters(FilterSet):
    # not_taken = CharFilter(method='tests_not_taken')
    
    class Meta:
        model = Test
        fields = '__all__'
