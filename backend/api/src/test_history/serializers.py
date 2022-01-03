from django.db import models
from rest_framework import serializers
from .models import TestHistory


class TestHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TestHistory
        fields = "__all__"


class ListTestHistorySerializer(TestHistorySerializer):
    test_name = serializers.CharField(source='test.identifier')
    max_points = serializers.SerializerMethodField()

    def get_max_points(self, instance) -> int:
        return instance.calculate_max_points()
