from rest_framework.viewsets import ModelViewSet
from .models import Connection
from .serializers import ConnectionSerializer


class ConnectionViewSet(ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
