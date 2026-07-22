import {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    Popup,
    useMap
} from "react-leaflet";

import { useEffect } from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";


// Fix Leaflet marker icons in Vite

delete (L.Icon.Default.prototype as any)._getIconUrl;


L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

});




// =============================
// Marker Colors
// =============================

const createMarkerIcon = (type:string) => {


    let color = "#2563eb";


    switch(type) {


        case "current":

            color = "#16a34a";

            break;



        case "pickup":

            color = "#2563eb";

            break;



        case "break":

            color = "#f59e0b";

            break;



        case "rest":

            color = "#9333ea";

            break;



        case "destination":

            color = "#dc2626";

            break;


    }





    return L.divIcon({

        className:"custom-marker",


        html:`

        <div style="
            background:${color};
            width:34px;
            height:34px;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            display:flex;
            align-items:center;
            justify-content:center;
            border:3px solid white;
            box-shadow:0 3px 10px rgba(0,0,0,0.35);
        ">

            <div style="
                transform:rotate(45deg);
                color:white;
                font-size:18px;
                font-weight:bold;
            ">

                ●

            </div>


        </div>

        `,


        iconSize:[
            34,
            34
        ],


        iconAnchor:[
            17,
            34
        ]

    });


};







interface MarkerData {

    type:string;

    title:string;

    description?:string;

    latitude:number;

    longitude:number;

}





interface Props {

    geometry:number[][];

    markers:MarkerData[];

}








function FitRoute({

    geometry

}:{

    geometry:number[][]

}) {


    const map = useMap();



    useEffect(()=>{


        if(geometry.length > 0){


            const bounds = L.latLngBounds(

                geometry.map(point =>

                    [

                        point[1],

                        point[0]

                    ] as [number,number]

                )

            );



            map.fitBounds(

                bounds,

                {

                    padding:[
                        50,
                        50
                    ]

                }

            );


        }



    },[geometry,map]);



    return null;

}









function RouteMap({

    geometry,

    markers

}:Props){



    console.log(
        "MAP GEOMETRY:",
        geometry
    );


    console.log(
        "MAP MARKERS:",
        markers
    );





    if(!geometry || geometry.length===0){


        return (

            <div>

                No route geometry found

            </div>

        );

    }







    const routePoints:[number,number][] =

        geometry.map(point =>

            [

                point[1],

                point[0]

            ]

        );







    return (

        <div

            style={{

                height:"600px",

                width:"100%",

                borderRadius:"20px",

                overflow:"hidden"

            }}

        >





            <MapContainer


                center={routePoints[0]}


                zoom={6}


                style={{

                    height:"100%",

                    width:"100%"

                }}


            >





                <TileLayer

                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

                />






                <FitRoute

                    geometry={geometry}

                />







                <Polyline

                    positions={routePoints}

                    weight={5}

                />









                {
                    markers.map(

                        (marker,index)=>(



                            <Marker


                                key={index}


                                position={[

                                    marker.latitude,

                                    marker.longitude

                                ]}



                                icon={

                                    createMarkerIcon(

                                        marker.type

                                    )

                                }


                            >






                                <Popup>



                                    <div

                                        style={{

                                            minWidth:"220px"

                                        }}

                                    >




                                        <h3

                                            style={{

                                                margin:"0 0 8px 0",

                                                fontSize:"16px",

                                                fontWeight:"bold"

                                            }}

                                        >

                                            {marker.title}


                                        </h3>






                                        <p>


                                            <b>

                                                Purpose:

                                            </b>


                                            {" "}



                                            {

                                                marker.type === "break"

                                                &&

                                                "Mandatory 30 Minute Driving Break"

                                            }



                                            {

                                                marker.type === "rest"

                                                &&

                                                "10 Hour Daily Rest Required"

                                            }



                                            {

                                                marker.type === "current"

                                                &&

                                                "Trip Starting Location"

                                            }



                                            {

                                                marker.type === "pickup"

                                                &&

                                                "Load Pickup Point"

                                            }



                                            {

                                                marker.type === "destination"

                                                &&

                                                "Final Delivery Location"

                                            }



                                        </p>







                                        {

                                            marker.description &&


                                            <p>


                                                <b>

                                                    Details:

                                                </b>


                                                <br/>


                                                {marker.description}


                                            </p>


                                        }







                                        <p

                                            style={{

                                                fontSize:"12px",

                                                color:"#666"

                                            }}

                                        >


                                            Coordinates:


                                            <br/>


                                            {marker.latitude.toFixed(5)}


                                            ,

                                            {" "}


                                            {marker.longitude.toFixed(5)}



                                        </p>





                                    </div>






                                </Popup>





                            </Marker>


                        )

                    )

                }







            </MapContainer>





        </div>

    );

}




export default RouteMap;