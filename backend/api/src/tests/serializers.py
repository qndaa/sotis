from rest_framework import serializers
from .models import Test


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"


class FetchTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"
        depth = 3
