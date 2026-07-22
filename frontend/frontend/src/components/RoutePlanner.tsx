import { useState } from "react";
import "./RouteMap.css";
import RouteMap from "./Map";


interface MarkerData {

    type: string;

    title: string;

    description?: string;

    latitude: number;

    longitude: number;

}



interface RouteData {

    distance_km: number;

    total_driving_hours: number;

    geometry: number[][];

    markers: MarkerData[];

}



function RoutePlanner() {


    const [routeGenerated, setRouteGenerated] = useState(false);

    const [isAnimating, setIsAnimating] = useState(false);


    const [routeData, setRouteData] =
        useState<RouteData | null>(null);



    const [startLocation, setStartLocation] =
        useState("");


    const [destination, setDestination] =
        useState("");





    const generateRoute = async () => {


        try {


            setIsAnimating(true);



            const response = await fetch(

                "http://localhost:8000/api/trips/generate/",

                {

                    method: "POST",


                    headers: {

                        "Content-Type": "application/json",

                    },


                    body: JSON.stringify({

                        current_location:
                            startLocation,


                        pickup_location:
                            startLocation,


                        dropoff_location:
                            destination,


                        cycle_used: 70

                    })

                }

            );





            const data = await response.json();



            console.log(
                "Backend Response:",
                data
            );



            if (!response.ok) {


                console.error(
                    "API Error:",
                    data
                );


                setIsAnimating(false);

                return;

            }





            const trip = data.trip;



            const formattedRoute: RouteData = {


                distance_km:
                    trip.distance_km,



                total_driving_hours:
                    trip.total_driving_hours,



                // Convert GeoJSON MultiLineString
                // into Leaflet coordinates

                geometry:
                    trip.geometry.coordinates[0],



                // Receive markers from backend

                markers:
                    trip.markers || []

            };





            console.log(

                "Geometry sent to map:",

                formattedRoute.geometry

            );



            console.log(

                "Markers sent to map:",

                formattedRoute.markers

            );





            setRouteData(
                formattedRoute
            );



            setRouteGenerated(true);





            setTimeout(() => {


                setIsAnimating(false);


            }, 1000);



        }


        catch(error) {


            console.error(

                "Request Failed:",

                error

            );


            setIsAnimating(false);

        }


    };







    return (

        <div

            className={
                `app ${
                    routeGenerated
                    ? "route-mode"
                    : ""
                }`
            }

        >





            {!routeGenerated && (


                <div className="search-panel">





                    <input


                        placeholder="Start Location"


                        value={startLocation}


                        onChange={(e) =>

                            setStartLocation(
                                e.target.value
                            )

                        }


                    />






                    <input


                        placeholder="Destination"


                        value={destination}


                        onChange={(e) =>

                            setDestination(
                                e.target.value
                            )

                        }


                    />






                    <button

                        onClick={generateRoute}

                    >

                        Generate Route

                    </button>




                </div>


            )}









            <div className="map-container">






                {isAnimating && (


                    <div className="route-loader">


                        Generating Route...


                    </div>


                )}









                {routeGenerated && routeData && (



                    <RouteMap



                        geometry={
                            routeData.geometry
                        }



                        markers={
                            routeData.markers
                        }



                    />



                )}





            </div>









            {routeGenerated && routeData && (



                <div className="route-info">





                    <h3>

                        Route Generated

                    </h3>





                    <p>

                        Distance:
                        {" "}
                        {routeData.distance_km}
                        {" "}
                        km

                    </p>






                    <p>

                        Duration:
                        {" "}
                        {routeData.total_driving_hours}
                        {" "}
                        hours

                    </p>





                    <p>

                        Stops:
                        {" "}
                        {routeData.markers.length}

                    </p>





                </div>


            )}







        </div>


    );

}



export default RoutePlanner;