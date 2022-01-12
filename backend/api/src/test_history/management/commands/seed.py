from django.core.management.base import BaseCommand
from faker import Faker
import datetime
import random
from src.questions.models import Question
from src.users.models import User
from src.tests.models import Test
from src.test_history.models import TestHistory
from src.test_history.constants import StatusOfTestList
from src.sections.models import Section
from src.answers.models import Answer


class Command(BaseCommand):
    help = "Seeds relevant and clean data"
    faker = Faker()
    default_user_password = "Password123!"

    def handle(self, *args, **kwargs):
        user_1, user_2, user_3, teacher = self.seed_users()
        test, q1_answers, q2_answers, q3_answers = self.seed_test(teacher=teacher)
        self.seed_test_histories(
            user_1, user_2, user_3, test, q1_answers, q2_answers, q3_answers
        )

    def seed_users(self):
        user_1 = User.objects.create(
            email=self.faker.email(),
            password=self.default_user_password,
            first_name=self.faker.name().split()[0],
            last_name=self.faker.name().split()[1],
            is_staff=False,
            is_superuser=False,
        )

        user_2 = User.objects.create(
            email=self.faker.email(),
            password=self.default_user_password,
            first_name=self.faker.name().split()[0],
            last_name=self.faker.name().split()[1],
            is_staff=False,
            is_superuser=False,
        )

        user_3 = User.objects.create(
            email=self.faker.email(),
            password=self.default_user_password,
            first_name=self.faker.name().split()[0],
            last_name=self.faker.name().split()[1],
            is_staff=False,
            is_superuser=False,
        )

        teacher = User.objects.create(
            email=self.faker.email(),
            password=self.default_user_password,
            first_name=self.faker.name().split()[0],
            last_name=self.faker.name().split()[1],
            is_staff=True,
            is_superuser=False,
        )

        return user_1, user_2, user_3, teacher

    def seed_test(self, teacher: User):
        (
            correct_answers_q1,
            answers_q1,
            correct_answers_q2,
            answers_q2,
            correct_answers_q3,
            answers_q3,
        ) = self.seed_answers()

        question_1 = Question.objects.create(
            identifier="1",
            time_dependant=False,
            text="HTML is what type of language ?",
            min_choices=0,
            max_choices=1,
            value=33,
            created_by=teacher,
        )
        question_1.all_answers.set(answers_q1)

        question_2 = Question.objects.create(
            identifier="2",
            time_dependant=False,
            text="HTML uses ",
            min_choices=0,
            max_choices=1,
            value=33,
            created_by=teacher,
        )
        question_2.all_answers.set(answers_q2)

        question_3 = Question.objects.create(
            identifier="3",
            time_dependant=False,
            text="Apart from <b> tag, what other tag makes text bold ?",
            min_choices=0,
            max_choices=1,
            value=33,
            created_by=teacher,
        )
        question_3.all_answers.set(answers_q3)

        section_1 = Section.objects.create(
            identifier="web_dev",
            title="Web development 101",
            created_by=teacher,
        )
        section_1.questions.set([question_1, question_2, question_3])

        test_1 = Test.objects.create(identifier="Basic HTML test", author=teacher)
        test_1.sections.add(section_1)

        return test_1, answers_q1, answers_q2, answers_q3

    def seed_answers(self):
        correct_answer_q_1_a = Answer.objects.create(
            identifier="a", text="Markup Language"
        )
        answer_q_1_b = Answer.objects.create(identifier="b", text="Scripting Language")
        answer_q_1_c = Answer.objects.create(
            identifier="c", text="Programming Language"
        )
        answer_q_1_d = Answer.objects.create(identifier="d", text="Network protocol")
        answers_q1 = [
            correct_answer_q_1_a,
            answer_q_1_b,
            answer_q_1_c,
            answer_q_1_d,
        ]
        correct_answers_q1 = [correct_answer_q_1_a]

        correct_answer_q_2_a = Answer.objects.create(
            identifier="a", text="Fixed tags defined by the language"
        )
        answer_q_2_b = Answer.objects.create(identifier="b", text="User defined tags")
        answer_q_2_c = Answer.objects.create(identifier="c", text="Pre-specified tags")
        answer_q_2_d = Answer.objects.create(
            identifier="d", text="Tags only for linking"
        )
        answers_q2 = [
            correct_answer_q_2_a,
            answer_q_2_b,
            answer_q_2_c,
            answer_q_2_d,
        ]
        correct_answers_q2 = [correct_answer_q_2_a]

        correct_answer_q_3_a = Answer.objects.create(identifier="a", text="<strong>")
        answer_q_3_b = Answer.objects.create(identifier="b", text="<fat>")
        answer_q_3_c = Answer.objects.create(identifier="c", text="<emp>")
        answer_q_3_d = Answer.objects.create(identifier="d", text="<black>")
        answers_q3 = [
            correct_answer_q_3_a,
            answer_q_3_b,
            answer_q_3_c,
            answer_q_3_d,
        ]
        correct_answers_q3 = [correct_answer_q_3_a]

        return (
            correct_answers_q1,
            answers_q1,
            correct_answers_q2,
            answers_q2,
            correct_answers_q3,
            answers_q3,
        )

    def seed_test_histories(
        self,
        user_1: User,
        user_2: User,
        user_3: User,
        test: Test,
        answers_q1,
        answers_q2,
        answers_q3,
    ):
        given_answers_1 = answers_q1[random.randint(0, 2)]
        given_answers_2 = answers_q2[random.randint(0, 2)]
        given_answers_3 = answers_q3[random.randint(0, 2)]

        test_history_1 = TestHistory.objects.create(
            date=datetime.date.today(),
            total_points=99,
            test_status=StatusOfTestList.PASSED,
            student=user_1,
            test=test,
        )
        test_history_1.given_answers.set(
            [given_answers_1, given_answers_2, given_answers_3]
        )

        given_answers_1 = answers_q1[random.randint(0, 2)]
        given_answers_2 = answers_q2[random.randint(0, 2)]
        given_answers_3 = answers_q3[random.randint(0, 2)]

        test_history_2 = TestHistory.objects.create(
            date=datetime.date.today(),
            total_points=99,
            test_status=StatusOfTestList.PASSED,
            student=user_2,
            test=test,
        )
        test_history_2.given_answers.set(
            [
                given_answers_1,
                given_answers_2,
                given_answers_3,
            ]
        )

        given_answers_1 = answers_q1[random.randint(0, 2)]
        given_answers_2 = answers_q2[random.randint(0, 2)]
        given_answers_3 = answers_q3[random.randint(0, 2)]

        test_history_3 = TestHistory.objects.create(
            date=datetime.date.today(),
            total_points=99,
            test_status=StatusOfTestList.PASSED,
            student=user_3,
            test=test,
        )
        test_history_3.given_answers.set(
            [given_answers_1, given_answers_2, given_answers_3]
        )

        return test_history_1, test_history_2, test_history_3
