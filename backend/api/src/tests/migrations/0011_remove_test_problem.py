# Generated by Django 3.2.8 on 2022-02-02 21:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0010_auto_20220123_2244'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='test',
            name='problem',
        ),
    ]
