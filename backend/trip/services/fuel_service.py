class FuelService:
    """
    Generates fuel stops according to FMCSA trip assumptions.
    Fuel required every 1000 miles.
    """

    FUEL_INTERVAL_MILES = 1000


    def generate_fuel_stops(
        self,
        route
    ):

        fuel_stops = []


        distance_km = route.get(
            "distance_km",
            0
        )


        # km to miles

        total_miles = (
            distance_km * 0.621371
        )


        route_points = route.get(
            "route_points",
            []
        )


        if total_miles <= self.FUEL_INTERVAL_MILES:

            return fuel_stops



        fuel_count = int(
            total_miles //
            self.FUEL_INTERVAL_MILES
        )



        for i in range(1, fuel_count + 1):


            target_distance = (

                i *
                self.FUEL_INTERVAL_MILES

            )


            point = self.find_point(

                route_points,

                target_distance

            )


            if point:


                fuel_stops.append(

                    {
                        "type":
                        "fuel",


                        "title":
                        "Fuel Stop",


                        "description":
                        f"Fuel required after {target_distance} miles",


                        "latitude":
                        point["latitude"],


                        "longitude":
                        point["longitude"],


                        "distance_miles":
                        target_distance
                    }

                )


        return fuel_stops





    def find_point(
        self,
        route_points,
        target_miles
    ):


        for point in route_points:


            point_miles = (

                point.get(
                    "distance_from_start",
                    0
                )

                *

                0.621371

            )


            if point_miles >= target_miles:

                return point



        return None