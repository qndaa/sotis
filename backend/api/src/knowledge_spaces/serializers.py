from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import KnowledgeSpace
from ..tests.serializers import TestSerializer


class CreateKnowledgeSpaceSerializer(ModelSerializer):
    class Meta:
        model = KnowledgeSpace
        fields = "__all__"


class ListKnowledgeSpaceSerializer(ModelSerializer):
    domains = SerializerMethodField()
    questions = SerializerMethodField()
    tests = SerializerMethodField()

    class Meta:
        model = KnowledgeSpace
        fields = "__all__"
        depth = 2

    def get_domains(self, instance):
        test = instance.test
        if instance.test:
            sections = test.sections.all()
            question_domains = []
            for section in sections:
                questions = section.questions.all()
                for question in questions:
                    question_domains.append({'id': question.domain.id, 'name': question.domain.name})

            return question_domains
        if instance.tests.exists():
            question_domains = []
            for test in instance.tests.all():
                sections = test.sections.all()
                for section in sections:
                    questions = section.questions.all()
                    for question in questions:
                        question_domains.append({'id': question.domain.id, 'name': question.domain.name})
                return question_domains

    def get_questions(self, instance):
        test = instance.test
        if instance.test:
            sections = test.sections.all()
            question_domains = []
            for section in sections:
                questions = section.questions.all()
                for question in questions:
                    question_domains.append({'id': question.id, 'text': question.text, 'domain_id': question.domain.id})
            return question_domains

        if instance.tests.exists():
            question_domains = []
            for test in instance.tests.all():
                sections = test.sections.all()
                for section in sections:
                    questions = section.questions.all()
                    for question in questions:
                        question_domains.append(
                            {'id': question.id, 'text': question.text, 'domain_id': question.domain.id})
            return question_domains

    def get_tests(self, instance):
        return TestSerializer(instance.tests, many=True).data
