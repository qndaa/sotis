from django_filters import FilterSet

from .models import KnowledgeSpace


class KnowledgeSpaceFilter(FilterSet):
    class Meta:
        model = KnowledgeSpace
        fields = '__all__'
