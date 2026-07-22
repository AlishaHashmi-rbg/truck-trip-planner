from django.urls import path
from .views import GenerateTripView

urlpatterns = [
    path("generate/", GenerateTripView.as_view(), name="generate-trip"),
]