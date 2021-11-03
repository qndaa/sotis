from django.db import models
from rest_framework import serializers
from .models import TestHistory


class TestHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TestHistory
        fields = "__all__"
