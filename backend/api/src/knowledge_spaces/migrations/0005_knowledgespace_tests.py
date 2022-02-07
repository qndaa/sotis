# Generated by Django 3.2.8 on 2022-01-24 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0010_auto_20220123_2244'),
        ('knowledge_spaces', '0004_auto_20220123_2244'),
    ]

    operations = [
        migrations.AddField(
            model_name='knowledgespace',
            name='tests',
            field=models.ManyToManyField(related_name='contained_tests', to='tests.Test'),
        ),
    ]