class ELDService:
    """
    Generates FMCSA style ELD daily logs.
    """

    def __init__(self):
        pass


    def generate_logs(
        self,
        hos_schedule
    ):

        logs = []


        # support dictionary response
        if isinstance(hos_schedule, dict):

            schedule = hos_schedule.get(
                "schedule",
                []
            )

        else:

            schedule = hos_schedule



        for day in schedule:


            events = []

            current_time = 0



            # -----------------------------
            # OFF DUTY / START OF DAY
            # -----------------------------

            rest_hours = day.get(
                "rest_hours",
                10
            )


            events.append(
                {
                    "status":
                    "OFF DUTY",

                    "start":
                    current_time,

                    "end":
                    current_time +
                    rest_hours
                }
            )


            current_time += rest_hours



            # -----------------------------
            # DRIVING
            # -----------------------------

            driving_hours = day.get(
                "driving_hours",
                0
            )


            # Split driving for 30 min break

            if driving_hours > 8:


                first_drive = 8


                events.append(
                    {
                        "status":
                        "DRIVING",

                        "start":
                        current_time,

                        "end":
                        current_time +
                        first_drive
                    }
                )


                current_time += first_drive



                # 30 minute break

                events.append(
                    {
                        "status":
                        "ON DUTY",

                        "activity":
                        "30 Minute Break",

                        "start":
                        current_time,

                        "end":
                        current_time +
                        0.5
                    }
                )


                current_time += 0.5



                remaining_drive = (
                    driving_hours -
                    first_drive
                )


                events.append(
                    {
                        "status":
                        "DRIVING",

                        "start":
                        current_time,

                        "end":
                        current_time +
                        remaining_drive
                    }
                )


                current_time += remaining_drive



            else:


                events.append(
                    {
                        "status":
                        "DRIVING",

                        "start":
                        current_time,

                        "end":
                        current_time +
                        driving_hours
                    }
                )


                current_time += driving_hours



            # -----------------------------
            # ON DUTY
            # -----------------------------

            events.append(
                {
                    "status":
                    "ON DUTY",

                    "activity":
                    "Inspection",

                    "start":
                    current_time,

                    "end":
                    min(
                        current_time + 1,
                        24
                    )
                }
            )



            logs.append(
                {
                    "day":
                    day.get(
                        "day",
                        len(logs)+1
                    ),

                    "events":
                    events
                }
            )


        return logs