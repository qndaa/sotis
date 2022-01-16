from rest_framework import serializers
from .models import Connection, DomainConnection


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = "__all__"


class DomainConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DomainConnection
        fields = "__all__"


class CreateDomainConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DomainConnection
        fields = "__all__"
        depth = 1
