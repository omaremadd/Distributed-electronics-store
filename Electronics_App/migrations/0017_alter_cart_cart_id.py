# Generated by Django 5.0.4 on 2024-05-03 18:50

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Electronics_App', '0016_alter_cart_cart_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='Cart_id',
            field=models.UUIDField(default=uuid.UUID('9129e6f1-ef19-4aa2-acf5-e371c144488e'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]