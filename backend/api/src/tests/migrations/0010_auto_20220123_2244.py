# Generated by Django 3.2.8 on 2022-01-23 21:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sections', '0002_section_created_by'),
        ('problem', '0001_initial'),
        ('tests', '0009_test_start_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='problem',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='problem.problem'),
        ),
        migrations.AlterField(
            model_name='test',
            name='sections',
            field=models.ManyToManyField(to='sections.Section'),
        ),
    ]