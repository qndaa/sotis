# Generated by Django 3.2.8 on 2022-01-15 08:22

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True, max_length=255, null=True)),
                ('students', models.ManyToManyField(related_name='takes_courses', to=settings.AUTH_USER_MODEL)),
                ('teachers', models.ManyToManyField(related_name='teaches_courses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
