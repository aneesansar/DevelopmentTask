# Generated by Django 4.2.6 on 2023-10-06 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("DjangoBackend", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="CountryData",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("CountryName", models.CharField(max_length=255)),
                ("CountryCode", models.CharField(max_length=3)),
                ("IndicatorName", models.CharField(max_length=255)),
                ("IndicatorCode", models.CharField(max_length=50)),
                ("YearlyData", models.JSONField()),
            ],
        ),
        migrations.DeleteModel(
            name="MyModel",
        ),
    ]
