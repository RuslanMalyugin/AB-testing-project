# Generated by Django 4.0.1 on 2022-01-13 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_alter_order_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]