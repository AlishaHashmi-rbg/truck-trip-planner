import {
  BarChart3,
  Route,
  Clock3,
  CalendarDays,
  Truck,
  Map,
  AlertCircle,
} from "lucide-react";


interface HOSDay {
  day: number;
  driving_hours: number;
  rest_hours: number;
  break_required: boolean;
}


interface HOSSchedule {
  schedule: HOSDay[];
  days_required?: number;
}


interface Segment {
  name: string;
  distance_km: number;
  duration_hours: number;
}


interface Trip {

  distance_km: number;

  total_driving_hours: number;

  days_required: number;

  segments: Segment[];

  hos_schedule:
    | HOSDay[]
    | HOSSchedule;

}



interface TripSummaryProps {

  trip: Trip | null;

  loading: boolean;

  error: string;

}



function TripSummary({
  trip,
  loading,
  error,
}: TripSummaryProps) {



  const hosDays: HOSDay[] =
    trip
    ? Array.isArray(trip.hos_schedule)
      ? trip.hos_schedule
      : trip.hos_schedule?.schedule || []
    : [];




  if (loading) {

    return (

      <div className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        p-8
      ">

        <h2 className="
          flex
          items-center
          gap-3
          text-2xl
          font-bold
          text-slate-800
          mb-8
        ">

          <BarChart3 className="w-7 h-7 text-blue-600"/>

          Trip Summary

        </h2>


        <div className="
          text-center
          py-24
        ">

          <div className="
            animate-spin
            rounded-full
            h-12
            w-12
            border-4
            border-blue-600
            border-t-transparent
            mx-auto
          " />


          <p className="
            mt-6
            text-slate-600
            font-medium
          ">
            Calculating optimal route...
          </p>


        </div>


      </div>

    );

  }




  if (error) {

    return (

      <div className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-red-200
        p-8
      ">


        <h2 className="
          flex
          items-center
          gap-3
          text-2xl
          font-bold
          text-slate-800
          mb-8
        ">

          <BarChart3 className="w-7 h-7 text-blue-600"/>

          Trip Summary

        </h2>


        <div className="
          flex
          flex-col
          items-center
          justify-center
          py-16
        ">


          <AlertCircle className="
            w-14
            h-14
            text-red-500
            mb-4
          "/>


          <p className="
            text-red-600
            font-medium
          ">
            {error}
          </p>


        </div>


      </div>

    );

  }




  if (!trip) {

    return (

      <div className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        p-8
      ">


        <h2 className="
          flex
          items-center
          gap-3
          text-2xl
          font-bold
          text-slate-800
          mb-8
        ">

          <BarChart3 className="w-7 h-7 text-blue-600"/>

          Trip Summary

        </h2>


        <div className="
          text-center
          py-24
          text-slate-500
        ">


          <Map className="
            w-20
            h-20
            mx-auto
            mb-5
            text-slate-300
          "/>


          <h3 className="
            text-xl
            font-semibold
            text-slate-700
            mb-3
          ">
            No Trip Generated
          </h3>


          <p>

            Enter the trip details and click

            <br />

            <span className="
              font-semibold
              text-blue-600
            ">
              Generate Trip
            </span>

          </p>


        </div>


      </div>

    );

  }




  return (

    <div className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      border-slate-200
      p-8
    ">


      <h2 className="
        flex
        items-center
        gap-3
        text-2xl
        font-bold
        text-slate-800
        mb-8
      ">


        <BarChart3 className="w-7 h-7 text-blue-600"/>

        Trip Summary


      </h2>





      {/* SUMMARY CARDS */}

      <div className="
        grid
        grid-cols-3
        gap-5
        mb-10
      ">


        <div className="
          bg-gradient-to-br
          from-slate-50
          to-white
          border
          border-slate-200
          rounded-2xl
          p-6
          text-center
        ">

          <Route className="
            w-6
            h-6
            text-blue-600
            mx-auto
            mb-3
          "/>


          <p className="text-sm text-slate-500">
            Distance
          </p>


          <p className="text-2xl font-bold mt-2">
            {trip.distance_km} km
          </p>


        </div>





        <div className="
          bg-gradient-to-br
          from-slate-50
          to-white
          border
          border-slate-200
          rounded-2xl
          p-6
          text-center
        ">


          <Clock3 className="
            w-6
            h-6
            text-green-600
            mx-auto
            mb-3
          "/>


          <p className="text-sm text-slate-500">
            Driving Time
          </p>


          <p className="text-2xl font-bold mt-2">
            {trip.total_driving_hours} hrs
          </p>


        </div>





        <div className="
          bg-gradient-to-br
          from-slate-50
          to-white
          border
          border-slate-200
          rounded-2xl
          p-6
          text-center
        ">


          <CalendarDays className="
            w-6
            h-6
            text-orange-600
            mx-auto
            mb-3
          "/>


          <p className="text-sm text-slate-500">
            Days
          </p>


          <p className="text-2xl font-bold mt-2">
            {trip.days_required}
          </p>


        </div>


      </div>





      {/* ROUTE */}

      <div className="mb-10">


        <h3 className="
          flex
          items-center
          gap-2
          text-xl
          font-semibold
          mb-5
        ">

          <Route className="w-5 h-5 text-blue-600"/>

          Route Timeline

        </h3>



        <div className="space-y-4">


          {
            trip.segments.map(
              (segment,index)=>(

                <div
                  key={index}
                  className="
                    border
                    rounded-2xl
                    p-5
                  "
                >

                  <h4 className="font-semibold mb-3">
                    {segment.name}
                  </h4>


                  <div className="grid grid-cols-2">


                    <div>

                      <p className="text-sm text-slate-500">
                        Distance
                      </p>

                      <p className="font-semibold">
                        {segment.distance_km} km
                      </p>

                    </div>



                    <div>

                      <p className="text-sm text-slate-500">
                        Duration
                      </p>


                      <p className="font-semibold">
                        {segment.duration_hours} hrs
                      </p>


                    </div>


                  </div>


                </div>

              )
            )
          }


        </div>


      </div>







      {/* HOS */}

      <div>


        <h3 className="
          flex
          items-center
          gap-2
          text-xl
          font-semibold
          mb-5
        ">


          <Truck className="w-5 h-5 text-blue-600"/>

          HOS Schedule


        </h3>




        <div className="space-y-4">


          {
            hosDays.map(
              (day)=>(


                <div
                  key={day.day}
                  className="
                    border
                    rounded-2xl
                    p-5
                  "
                >


                  <h4 className="font-bold text-lg mb-4">

                    Day {day.day}

                  </h4>



                  <div className="grid grid-cols-3 gap-6">


                    <div>

                      <p className="text-sm text-slate-500">
                        Driving
                      </p>

                      <p className="font-semibold">
                        {day.driving_hours} hrs
                      </p>

                    </div>



                    <div>

                      <p className="text-sm text-slate-500">
                        Rest
                      </p>

                      <p className="font-semibold">
                        {day.rest_hours} hrs
                      </p>

                    </div>




                    <div>

                      <p className="text-sm text-slate-500">
                        Break
                      </p>


                      <p className="font-semibold">
                        {
                          day.break_required
                          ?
                          "Required"
                          :
                          "Not Required"
                        }
                      </p>


                    </div>


                  </div>


                </div>


              )
            )
          }



        </div>


      </div>




    </div>

  );

}


export default TripSummary;