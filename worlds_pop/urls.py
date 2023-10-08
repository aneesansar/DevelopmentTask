"""
URL configuration for worlds_pop project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from DjangoBackend import views
from DjangoBackend.views import CountryDataList, CountryDataListByCountryName


urlpatterns = [
    #Defaulf path for admin panel
    path("admin/", admin.site.urls),

    #API path to retrieve whole data set from the database
    path('api/countrydata/', CountryDataList.as_view(), name='countrydata-list'),

    #API path to retrieve single country from the database
    path('api/countrydata/<str:country_name_lowercase>/', CountryDataListByCountryName.as_view(), name='country-data-by-name'),

    #API path for post method to upload CSV file to backend
    path('api/upload_csv/', views.upload_csv, name='upload_csv'),

]

