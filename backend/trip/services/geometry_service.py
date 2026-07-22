"""
geometry_service.py

Utilities for simplifying and enriching route geometry.
"""

import math


class GeometryService:

    def haversine_distance(self, lat1, lon1, lat2, lon2):

        r = 6371.0

        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)

        a = (
            math.sin(dlat / 2) ** 2
            + math.cos(math.radians(lat1))
            * math.cos(math.radians(lat2))
            * math.sin(dlon / 2) ** 2
        )

        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

        return r * c

    def simplify_coordinates(self, coordinates, step=5):

        if len(coordinates) <= step:
            return coordinates

        simplified = coordinates[::step]

        if simplified[-1] != coordinates[-1]:
            simplified.append(coordinates[-1])

        return simplified

    def build_route_points(self, coordinates):

        points = []

        total_distance = 0.0

        previous = None

        for point in coordinates:

            # Accept coordinates even if they contain more than two values
            lon = point[0]
            lat = point[1]

            if previous is not None:

                total_distance += self.haversine_distance(
                    previous["latitude"],
                    previous["longitude"],
                    lat,
                    lon,
                )

            points.append(
                {
                    "latitude": lat,
                    "longitude": lon,
                    "distance_from_start": round(total_distance, 2),
                }
            )

            previous = {
                "latitude": lat,
                "longitude": lon,
            }

        return points

    def find_point_by_distance(self, route_points, distance_km):

        if not route_points:
            return None

        for point in route_points:

            if point["distance_from_start"] >= distance_km:
                return point

        return route_points[-1]

    def process_geometry(self, geometry):

        coordinates = geometry["coordinates"]

        # Handle nested coordinate arrays
        if (
            coordinates
            and isinstance(coordinates[0], list)
            and len(coordinates[0]) > 0
            and isinstance(coordinates[0][0], list)
        ):
            coordinates = coordinates[0]

        simplified = self.simplify_coordinates(coordinates)

        return {

            "geometry": {

                "type": geometry["type"],

                "coordinates": simplified,

            },

            "route_points": self.build_route_points(simplified),

        }