from django.db import models


class Driver(models.Model):
    """
    Stores truck driver information.
    """

    name = models.CharField(
        max_length=100
    )

    license_number = models.CharField(
        max_length=100,
        unique=True
    )

    cycle_used = models.FloatField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name



class Trip(models.Model):
    """
    Stores generated truck trips.
    """

    driver = models.ForeignKey(
        Driver,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="trips"
    )

    current_location = models.CharField(
        max_length=255
    )

    pickup_location = models.CharField(
        max_length=255
    )

    dropoff_location = models.CharField(
        max_length=255
    )

    distance_km = models.FloatField()

    duration_hours = models.FloatField()

    days_required = models.IntegerField(
        default=1
    )

    hos_schedule = models.JSONField(
        default=list
    )

    route_segments = models.JSONField(
        default=list
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return (
            f"{self.current_location} "
            f"→ {self.dropoff_location}"
        )