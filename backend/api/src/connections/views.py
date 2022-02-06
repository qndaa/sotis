from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Connection, DomainConnection
from .serializers import ConnectionSerializer, DomainConnectionSerializer, CreateDomainConnectionSerializer
from ..knowledge_spaces.models import KnowledgeSpace


class ConnectionViewSet(ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer


class DomainConnectionViewSet(ModelViewSet):
    queryset = DomainConnection.objects.all()
    serializers = {'default': DomainConnectionSerializer}

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers.get('default'))

    def create(self, request, *args, **kwargs):
        knowledge_space_id = request.data.get("knowledge_space")
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        knowledge_space = KnowledgeSpace.objects.get(id=knowledge_space_id)
        knowledge_space.domain_connections.add(instance)

        response_serializer = CreateDomainConnectionSerializer(instance)
        return Response(response_serializer.data)

    @action(detail=False, methods={"POST"}, url_path=r"mass-save")
    def mass_save(self, request):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
