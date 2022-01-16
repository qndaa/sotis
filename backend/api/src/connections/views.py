from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Connection, DomainConnection
from .serializers import ConnectionSerializer, DomainConnectionSerializer, CreateDomainConnectionSerializer


class ConnectionViewSet(ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer


class DomainConnectionViewSet(ModelViewSet):
    queryset = DomainConnection.objects.all()
    serializers = {'default': DomainConnectionSerializer}

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers.get('default'))

    def create(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        response_serializer = CreateDomainConnectionSerializer(instance)
        return Response(response_serializer.data)
