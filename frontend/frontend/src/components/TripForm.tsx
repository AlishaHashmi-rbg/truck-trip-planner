import { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Package,
  Flag,
  Truck,
  FileText,
} from "lucide-react";

interface TripFormProps {
  setTrip: (trip: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

function TripForm({
  setTrip,
  setLoading,
  setError,
}: TripFormProps) {
  const [currentLocation, setCurrentLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [cycleUsed, setCycleUsed] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const generateTrip = async () => {
    if (
      !currentLocation ||
      !pickupLocation ||
      !dropoffLocation ||
      !cycleUsed
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/trips/generate/",
        {
          current_location: currentLocation,
          pickup_location: pickupLocation,
          dropoff_location: dropoffLocation,
          cycle_used: Number(cycleUsed),
        }
      );

      setTrip(response.data.trip);
    } catch (error: any) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Unable to generate trip.");
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

      <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800 mb-8">
        <FileText className="w-7 h-7 text-blue-600" />
        Trip Details
      </h2>

      <div
        className="space-y-6"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            generateTrip();
          }
        }}
      >

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
            <MapPin className="w-5 h-5 text-blue-600" />
            Current Location
          </label>

          <input
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="Enter complete current location e.g place, city, country."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
            <Package className="w-5 h-5 text-blue-600" />
            Pickup Location
          </label>

          <input
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Enter complete pickup location e.g place, city, country."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
            <Flag className="w-5 h-5 text-blue-600" />
            Drop-off Location
          </label>

          <input
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            placeholder="Enter complete dropoff location e.g place, city, country."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        <div>

          <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
            <Truck className="w-5 h-5 text-blue-600" />
            Current Cycle Used (Hours)
          </label>

          <input
            type="number"
            min="0"
            max="70"
            value={cycleUsed}
            onChange={(e) => setCycleUsed(e.target.value)}
            placeholder="Example: 5"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          <p className="mt-2 text-sm text-slate-500">
            Enter the number of hours already used in the current 70-hour duty cycle.
          </p>

        </div>

        <button
          disabled={submitting}
          onClick={generateTrip}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {submitting ? "Generating Trip..." : "Generate Trip"}
        </button>

      </div>

    </div>
  );
}

export default TripForm;