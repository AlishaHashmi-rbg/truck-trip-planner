class HOSService:
    """
    Generates FMCSA compliant HOS schedule.
    """

    MAX_DRIVING_HOURS = 11
    REQUIRED_REST_HOURS = 10

    BREAK_AFTER_HOURS = 8


    def calculate_schedule(
        self,
        total_driving_hours
    ):


        schedule = []

        remaining_driving = total_driving_hours

        day = 1



        while remaining_driving > 0:


            driving_today = min(
                remaining_driving,
                self.MAX_DRIVING_HOURS
            )


            schedule.append(

                {
                    "day": day,

                    "driving_hours":
                    round(
                        driving_today,
                        2
                    ),

                    "rest_hours":
                    self.REQUIRED_REST_HOURS,


                    "break_required":
                    driving_today >= self.BREAK_AFTER_HOURS
                }

            )


            remaining_driving -= driving_today


            day += 1



        return {

            "days_required":
            len(schedule),

            "schedule":
            schedule

        }