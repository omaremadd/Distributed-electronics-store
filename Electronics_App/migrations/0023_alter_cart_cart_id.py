# Generated by Django 5.0.4 on 2024-05-03 19:04

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Electronics_App', '0022_alter_cart_cart_id_alter_update_remaining_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='Cart_id',
            field=models.UUIDField(default=uuid.UUID('64f36823-a623-41df-9416-8d08e7a8712a'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]