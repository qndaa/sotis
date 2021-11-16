

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('test_history', '0003_alter_testhistory_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='testhistory',
            options={'verbose_name_plural': 'Test histories'},
        ),
    ]
