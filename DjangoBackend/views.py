from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import generics
from .models import CountryData
from .serializers import CountryDataSerializer
import csv 
from django.db.models import Q


#APIView to retrieve whole dataset from the database
class CountryDataList(generics.ListAPIView):
    queryset = CountryData.objects.all()
    serializer_class = CountryDataSerializer

#APIView to retrieve single country from the database
class CountryDataListByCountryName(generics.ListAPIView):
    serializer_class = CountryDataSerializer

    def get_queryset(self):
        country_name_lowercase = self.kwargs['country_name_lowercase']
        title_case_country_name = country_name_lowercase.title()  # Convert to title case
        return CountryData.objects.filter(Q(CountryName__icontains=title_case_country_name))

#API for POST method to accept CSV file upload from the frontend (React)

@api_view(['POST'])  # Specify the HTTP methods allowed for this view
def upload_csv(request):
    if request.method == 'POST':
        # Get the uploaded CSV file from the request
        uploaded_file = request.FILES.get('csv_file')

        if not uploaded_file:
            return JsonResponse({'error': 'No file uploaded'}, status=400)

        # Create an empty list to store the data rows 
        data_rows = []

        # Parse the CSV data
        try:
            decoded_file = uploaded_file.read().decode('utf-8')
            csv_data = csv.DictReader(decoded_file.splitlines())
            for row in csv_data:
                data_rows.append(row)
        except Exception as e:
            return JsonResponse({'error': 'Error parsing CSV file'}, status=400)

        # Import the data into the database
        try:
            for row in data_rows:
                yearly_data = {}
                for year in range(1960, 2018):
                    year_str = str(year)
                    if row.get(year_str):
                        yearly_data[year_str] = float(row[year_str])

                CountryData.objects.create(
                    CountryName=row['Country Name'],
                    CountryCode=row['Country Code'],
                    IndicatorName=row['Indicator Name'],
                    IndicatorCode=row['Indicator Code'],
                    YearlyData=yearly_data
                )
            return JsonResponse({'message': 'CSV file uploaded successfully'})
        except Exception as e:
            return JsonResponse({'error': 'Error importing data to the database'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
