from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import TripRequestSerializer

from .services.geocoding_service import GeocodingService
from .services.route_service import RouteService
from .services.trip_planning_service import TripPlannerService

import logging


logger = logging.getLogger(__name__)


class GenerateTripView(APIView):

    def post(self, request):

        try:

            # ------------------------------------
            # Validate Request Data
            # ------------------------------------

            serializer = TripRequestSerializer(
                data=request.data
            )


            if not serializer.is_valid():

                return Response(
                    {
                        "success": False,
                        "message": "Invalid input data.",
                        "errors": serializer.errors
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )


            data = serializer.validated_data



            # ------------------------------------
            # Initialize Services
            # ------------------------------------

            geocoder = GeocodingService()

            router = RouteService()

            planner = TripPlannerService()



            # ------------------------------------
            # Geocode Locations
            # ------------------------------------

            current = geocoder.get_coordinates(
                data["current_location"]
            )


            pickup = geocoder.get_coordinates(
                data["pickup_location"]
            )


            dropoff = geocoder.get_coordinates(
                data["dropoff_location"]
            )



            # ------------------------------------
            # Generate Route
            # ------------------------------------

            route = router.get_route(

                current["latitude"],
                current["longitude"],

                dropoff["latitude"],
                dropoff["longitude"]

            )



            # ------------------------------------
            # Generate Complete Trip Plan
            # ------------------------------------

            trip = planner.generate_trip_plan(

                route,

                current,

                pickup,

                dropoff

            )



            return Response(
                {
                    "success": True,

                    "message":
                    "Trip generated successfully",

                    "trip": trip
                },

                status=status.HTTP_200_OK
            )



        # ------------------------------------
        # Known Errors
        # ------------------------------------

        except ValueError as e:

            logger.warning(
                "Trip validation error: %s",
                e
            )


            return Response(
                {
                    "success": False,

                    "message":
                    "Unable to process trip request."
                },

                status=status.HTTP_400_BAD_REQUEST
            )



        # ------------------------------------
        # Missing External Data
        # ------------------------------------

        except KeyError as e:

            logger.exception(
                "Missing data from service response"
            )


            return Response(
                {
                    "success": False,

                    "message":
                    "Invalid response received from service."
                },

                status=status.HTTP_502_BAD_GATEWAY
            )



        # ------------------------------------
        # Unexpected Errors
        # ------------------------------------

        except Exception:

            logger.exception(
                "Trip generation failed"
            )


            return Response(
                {
                    "success": False,

                    "message":
                    "Unable to generate trip. Please try again later."
                },

                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )