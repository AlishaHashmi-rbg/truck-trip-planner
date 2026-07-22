class RoutePlannerService:
    """
    Combines multiple route segments into one trip.
    """

    def combine_routes(
        self,
        route1,
        route2,
        current_location,
        pickup_location,
        dropoff_location,
    ):

        total_distance = (
            route1["distance_km"] +
            route2["distance_km"]
        )

        total_duration = (
            route1["duration_hours"] +
            route2["duration_hours"]
        )

        # -------------------------------------------------
        # Combine Geometry
        # -------------------------------------------------

        coordinates = []

        if route1.get("geometry"):

            coordinates.extend(
                route1["geometry"]["coordinates"]
            )

        if route2.get("geometry"):

            coordinates.extend(
                route2["geometry"]["coordinates"]
            )

        # -------------------------------------------------
        # Combine Route Points
        # -------------------------------------------------

        route_points = []

        if route1.get("route_points"):

            route_points.extend(
                route1["route_points"]
            )

        if route2.get("route_points"):

            if route_points:

                last_distance = route_points[-1]["distance_from_start"]

            else:

                last_distance = 0

            for point in route2["route_points"]:

                route_points.append(
                    {
                        "latitude": point["latitude"],
                        "longitude": point["longitude"],
                        "distance_from_start":
                            point["distance_from_start"] + last_distance,
                    }
                )

        # -------------------------------------------------
        # Return Combined Route
        # -------------------------------------------------

        return {

            "distance_km": round(total_distance, 2),

            "duration_hours": round(total_duration, 2),

            "geometry": {

                "type": "LineString",

                "coordinates": coordinates,

            },

            "route_points": route_points,

            "markers": {

                "current": current_location,

                "pickup": pickup_location,

                "dropoff": dropoff_location,

            },

            "segments": [

                {

                    "name": "Current to Pickup",

                    "distance_km": route1["distance_km"],

                    "duration_hours": route1["duration_hours"],

                },

                {

                    "name": "Pickup to Dropoff",

                    "distance_km": route2["distance_km"],

                    "duration_hours": route2["duration_hours"],

                },

            ],

        }