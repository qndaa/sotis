# Generated by Django 3.2.8 on 2021-11-16 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0004_alter_test_author'),
        ('test_history', '0004_alter_testhistory_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='testhistory',
            name='test',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tests.test'),
        ),
    ]
