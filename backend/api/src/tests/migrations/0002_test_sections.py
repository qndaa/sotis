# Generated by Django 3.2.8 on 2021-11-16 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sections', '0002_section_created_by'),
        ('tests', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='sections',
            field=models.ManyToManyField(blank=True, null=True, to='sections.Section'),
        ),
    ]
