# Generated by Django 5.0.4 on 2024-05-03 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Electronics_App', '0006_remove_customer_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='contain',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.TextField(default=''),
        ),
    ]