# Generated by Django 3.2.8 on 2022-01-15 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='color',
            field=models.TextField(blank=True, max_length=20, null=True),
        ),
    ]
