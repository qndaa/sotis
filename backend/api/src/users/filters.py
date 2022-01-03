from django_filters import FilterSet
from .models import User


class UsersFilter(FilterSet):
    class Meta:
        model = User
        fields = '__all__'
