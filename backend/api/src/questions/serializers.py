from rest_framework import serializers
from .models import Question, Domain


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class FetchQuestionSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = '__all__'
        depth = 1

    def get_count(self, instance):
        return self.context.get("count", 0)

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__'
