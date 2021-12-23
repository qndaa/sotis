from rest_framework import serializers
from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class FetchQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        exclude = ("correct_answers",)
        depth = 1
