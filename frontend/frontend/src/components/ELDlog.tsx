import type { ELDLogDay } from "../App";


interface Props {
  eldLogs: ELDLogDay[];
}



function ELDLog({ eldLogs }: Props) {


  const rows = [
    "OFF DUTY",
    "SLEEPER BERTH",
    "DRIVING",
    "ON DUTY"
  ];



  const getRowIndex = (status: string) => {

    switch (status) {

      case "OFF DUTY":
        return 0;


      case "SLEEPER BERTH":
        return 1;


      case "DRIVING":
        return 2;


      case "ON DUTY":
        return 3;


      default:
        return 3;
    }

  };



  const position = (time:number) => {

    return `${(time / 24) * 100}%`;

  };



  return (

    <div className="
      bg-white
      rounded-xl
      shadow-md
      p-6
      mt-6
    ">


      <h2 className="
        text-2xl
        font-bold
        mb-8
      ">
        Electronic Logging Device (ELD) Record
      </h2>




      {
        eldLogs.map((day)=>(


          <div
            key={day.day}
            className="mb-14"
          >



            <h3 className="
              font-bold
              text-lg
              mb-4
            ">
              Day {day.day}
            </h3>





            <div className="flex">



              {/* STATUS LABELS */}

              <div className="
                w-44
                shrink-0
              ">



                <div className="
                  h-10
                  border
                " />



                {
                  rows.map(row=>(


                    <div

                      key={row}

                      className="
                        h-16
                        border
                        bg-gray-100
                        flex
                        items-center
                        px-3
                        text-sm
                        font-semibold
                      "

                    >

                      {row}

                    </div>


                  ))
                }


              </div>






              {/* GRAPH AREA */}

              <div className="flex-1">





                {/* HOUR HEADER */}

                <div className="
                  h-10
                  border
                  grid
                  grid-cols-24
                ">


                  {
                    Array.from({
                      length:24
                    }).map((_,i)=>(


                      <div

                        key={i}

                        className="
                          border-r
                          text-xs
                          flex
                          justify-center
                          items-center
                          font-medium
                        "

                      >

                        {i}

                      </div>


                    ))
                  }


                </div>








                {/* MAIN GRID */}

                <div className="
                  relative
                ">



                  {
                    rows.map(row=>(


                      <div

                        key={row}

                        className="
                          h-16
                          border
                        "

                      />


                    ))
                  }







                  {/* 15 MINUTE GRID */}

                  {
                    Array.from({
                      length:97
                    }).map((_,i)=>(


                      <div

                        key={i}

                        className={`
                          absolute
                          top-0
                          bottom-0
                          ${
                            i % 4 === 0
                            ?
                            "border-r border-gray-400"
                            :
                            "border-r border-gray-200"
                          }
                        `}


                        style={{

                          left:
                          `${(i/96)*100}%`

                        }}


                      />


                    ))
                  }









                  {/* EVENTS */}

                  {
                    day.events.map(
                      (event,index)=>{


                        const row =
                        getRowIndex(
                          event.status
                        );



                        return (


                          <div


                            key={index}


                            title={
                              `${event.status}${
                                event.activity
                                ?
                                " - " + event.activity
                                :
                                ""
                              }`
                            }



                            className="
                              absolute
                              bg-blue-700
                              h-1
                              rounded
                              cursor-pointer
                            "



                            style={{


                              top:
                              `${row*64+32}px`,



                              left:
                              position(
                                event.start
                              ),



                              width:
                              `${
                                (
                                  (event.end-event.start)
                                  /
                                  24
                                )
                                *
                                100
                              }%`

                            }}



                          />


                        );


                      }
                    )
                  }




                </div>








                {/* TIME FOOTER */}

                <div className="
                  flex
                  justify-between
                  text-xs
                  mt-2
                ">


                  <span>
                    00:00
                  </span>


                  <span>
                    06:00
                  </span>


                  <span>
                    12:00
                  </span>


                  <span>
                    18:00
                  </span>


                  <span>
                    24:00
                  </span>


                </div>




              </div>




            </div>




          </div>


        ))
      }



    </div>

  );

}


export default ELDLog;