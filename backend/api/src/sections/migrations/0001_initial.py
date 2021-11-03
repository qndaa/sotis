# Generated by Django 3.2.8 on 2021-11-01 14:31

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('questions', '0003_alter_question_all_answers'),
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('identifier', models.TextField(max_length=200)),
                ('title', models.TextField(max_length=200)),
                ('questions', models.ManyToManyField(related_name='questions', to='questions.Question')),
            ],
        ),
    ]
