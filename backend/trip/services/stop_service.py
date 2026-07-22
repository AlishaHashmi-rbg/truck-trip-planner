class StopService:
    """
    Generates map markers:
    - Current location
    - Pickup
    - Fuel stops
    - Breaks
    - Rest stops
    - Destination
    """


    BREAK_AFTER_HOURS = 8
    MAX_DRIVING_HOURS = 11



    def generate_markers(
        self,
        route,
        hos_schedule,
        current,
        pickup,
        dropoff,
        fuel_stops=None
    ):


        markers = []


        route_points = route.get(
            "route_points",
            []
        )


        total_distance = route["distance_km"]

        total_hours = route["duration_hours"]



        # -------------------------
        # Current
        # -------------------------

        markers.append({

            "type":"current",

            "title":"Current Location",

            "latitude":
            current["latitude"],

            "longitude":
            current["longitude"]

        })



        # -------------------------
        # Pickup
        # -------------------------

        markers.append({

            "type":"pickup",

            "title":"Pickup Location",

            "latitude":
            pickup["latitude"],

            "longitude":
            pickup["longitude"]

        })



        # -------------------------
        # Fuel Stops
        # -------------------------

        if fuel_stops:


            for fuel in fuel_stops:

                markers.append(fuel)



        # -------------------------
        # Break
        # -------------------------

        if total_hours > self.BREAK_AFTER_HOURS:


            break_distance = (

                self.BREAK_AFTER_HOURS /
                total_hours

            ) * total_distance



            point = self.find_point(

                route_points,

                break_distance

            )


            if point:

                markers.append({

                    "type":"break",

                    "title":
                    "30 Minute Break",

                    "description":
                    "Required after 8 driving hours",

                    "latitude":
                    point["latitude"],

                    "longitude":
                    point["longitude"]

                })



        # -------------------------
        # Rest Stops
        # -------------------------

        schedule = hos_schedule.get(
            "schedule",
            []
        )


        for day in schedule[:-1]:


            distance = (

                day["day"] *
                self.MAX_DRIVING_HOURS

            )


            if distance >= total_hours:

                continue



            rest_distance = (

                distance /
                total_hours

            ) * total_distance



            point = self.find_point(

                route_points,

                rest_distance

            )


            if point:


                markers.append({

                    "type":"rest",

                    "title":
                    "Mandatory Rest",

                    "description":
                    f"Day {day['day']} - 10 Hour Rest",

                    "latitude":
                    point["latitude"],

                    "longitude":
                    point["longitude"]

                })



        # -------------------------
        # Destination
        # -------------------------

        markers.append({

            "type":"destination",

            "title":
            "Destination",

            "latitude":
            dropoff["latitude"],

            "longitude":
            dropoff["longitude"]

        })



        return markers




    def find_point(
        self,
        route_points,
        distance
    ):


        if not route_points:

            return None



        for point in route_points:


            if point.get(
                "distance_from_start",
                0
            ) >= distance:


                return point



        return route_points[-1]