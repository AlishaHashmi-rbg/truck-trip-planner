import requests
from django.conf import settings
from trip.constants import GEOAPIFY_ROUTING_URL
from .geometry_service import GeometryService


class RouteService:
    def __init__(self):
        self.geometry_service = GeometryService()

    def get_route(self, start_latitude, start_longitude,
                  end_latitude, end_longitude):

        response = requests.get(
            GEOAPIFY_ROUTING_URL,
            params={
                "waypoints": f"{start_latitude},{start_longitude}|{end_latitude},{end_longitude}",
                "mode": "drive",
                "apiKey": settings.GEOAPIFY_API_KEY,
            },
            timeout=30,
        )
        response.raise_for_status()

        feature = response.json()["features"][0]
        properties = feature["properties"]

        processed = self.geometry_service.process_geometry(feature["geometry"])

        return {
            "distance_meters": properties["distance"],
            "distance_km": round(properties["distance"]/1000, 2),
            "duration_seconds": properties["time"],
            "duration_hours": round(properties["time"]/3600, 2),
            "geometry": processed["geometry"],
            "route_points": processed["route_points"],
        }
