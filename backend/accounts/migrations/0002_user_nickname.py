# Generated by Django 3.2.13 on 2022-11-17 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='nickname',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
    ]
