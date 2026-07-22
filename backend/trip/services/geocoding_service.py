import requests

from django.conf import settings

from trip.constants import GEOAPIFY_GEOCODING_URL


class GeocodingService:
    """
    Converts location names into latitude and longitude
    using Geoapify Geocoding API.
    """

    def get_coordinates(self, location):

        params = {
            "text": location,
            "limit": 5,
            "apiKey": settings.GEOAPIFY_API_KEY,
        }


        response = requests.get(
            GEOAPIFY_GEOCODING_URL,
            params=params,
            timeout=10,
        )


        response.raise_for_status()


        data = response.json()


        if not data.get("features"):
            raise Exception(
                f"Location not found: {location}"
            )


        # Select best result
        feature = data["features"][0]

        properties = feature["properties"]


        latitude = properties.get("lat")
        longitude = properties.get("lon")


        if latitude is None or longitude is None:
            raise Exception(
                f"Invalid coordinates for {location}"
            )


        print(
            "GEOCODE:",
            location,
            "=>",
            properties.get("formatted"),
            latitude,
            longitude
        )


        return {
            "latitude": latitude,
            "longitude": longitude
        }