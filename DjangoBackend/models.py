from django.db import models


#Models to import data from CSV to database
class CountryData(models.Model):
    CountryName = models.CharField(max_length=255)
    CountryCode = models.CharField(max_length=3)
    IndicatorName = models.CharField(max_length=255)
    IndicatorCode = models.CharField(max_length=50)
    YearlyData = models.JSONField()

    def __str__(self):
        return f"{self.CountryName} - {self.IndicatorName}"

    @classmethod
    def import_data_from_csv(cls, csv_file):
        import csv
        import json

        # Open and read the CSV file
        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Extract year-value pairs from the row
                yearly_data = {}
                for year in range(1960, 2018):
                    year_str = str(year)
                    if row.get(year_str):
                        yearly_data[year_str] = float(row[year_str])

                # Create a new instance of the model and save it
                cls.objects.create(
                    CountryName=row['Country Name'],
                    CountryCode=row['Country Code'],
                    IndicatorName=row['Indicator Name'],
                    IndicatorCode=row['Indicator Code'],
                    YearlyData=yearly_data
                )
