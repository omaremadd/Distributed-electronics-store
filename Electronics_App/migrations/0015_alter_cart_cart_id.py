# Generated by Django 5.0.4 on 2024-05-03 18:37

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Electronics_App', '0014_alter_cart_cart_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='Cart_id',
            field=models.UUIDField(default=uuid.UUID('e2314dc1-375b-4459-a7c7-445c804b0fa1'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]