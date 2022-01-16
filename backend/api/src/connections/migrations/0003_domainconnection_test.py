# Generated by Django 3.2.8 on 2022-01-16 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0009_test_start_date'),
        ('connections', '0002_domainconnection'),
    ]

    operations = [
        migrations.AddField(
            model_name='domainconnection',
            name='test',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tests.test'),
        ),
    ]