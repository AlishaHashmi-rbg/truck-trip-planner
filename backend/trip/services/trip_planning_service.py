from .hos_service import HOSService
from .eld_service import ELDService
from .stop_service import StopService
from .fuel_service import FuelService



class TripPlannerService:


    def __init__(self):

        self.hos_service = HOSService()

        self.eld_service = ELDService()

        self.stop_service = StopService()

        self.fuel_service = FuelService()




    def generate_trip_plan(
        self,
        route,
        current,
        pickup,
        dropoff
    ):


        driving_hours = route["duration_hours"]



        # -----------------------
        # Fuel Stops
        # -----------------------

        fuel_stops = self.fuel_service.generate_fuel_stops(

            route

        )



        # -----------------------
        # HOS
        # -----------------------

        hos_schedule = self.hos_service.calculate_schedule(

            driving_hours

        )


        schedule = hos_schedule.get(
            "schedule",
            []
        )



        # -----------------------
        # Markers
        # -----------------------

        markers = self.stop_service.generate_markers(
            route,
            hos_schedule,
            current,
            pickup,
            dropoff,
            fuel_stops
        )



        # add fuel markers

        markers.extend(
            fuel_stops
        )



        # -----------------------
        # ELD
        # -----------------------

        eld_logs = self.eld_service.generate_logs(

            schedule

        )



        return {


            "distance_km":
            route["distance_km"],


            "total_driving_hours":
            driving_hours,


            "days_required":
            hos_schedule["days_required"],


            "segments":
            route.get(
                "segments",
                []
            ),


            "geometry":
            route.get(
                "geometry"
            ),


            "hos_schedule":
            hos_schedule,


            "markers":
            markers,


            "fuel_stops":
            fuel_stops,


            "eld_logs":
            eld_logs

        }