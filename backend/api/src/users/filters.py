from django_filters import FilterSet, CharFilter
from .models import User


class UsersFilter(FilterSet):
    course = CharFilter(field_name='takes_courses__id')
    student = CharFilter(method='filter_students')

    class Meta:
        model = User
        fields = '__all__'

    def filter_students(self, queryset, value, *args, **kwargs):
        return queryset.filter(is_superuser=False, is_staff=False)
