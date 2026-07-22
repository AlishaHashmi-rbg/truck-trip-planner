import { useState } from "react";

import Header from "./components/Header";
import TripForm from "./components/TripForm";
import TripSummary from "./components/TripSummary";
import RouteMap from "./components/Map";
import ELDLog from "./components/ELDlog";

export interface HOSDay {
  day: number;
  driving_hours: number;
  rest_hours: number;
  break_required: boolean;
}

export interface Segment {
  name: string;
  distance_km: number;
  duration_hours: number;
}

export interface Marker {
  type: string;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
}

export interface ELDLogEvent {
  status: string;
  start: number;
  end: number;
  activity?: string;
}

export interface ELDLogDay {
  day: number;
  events: ELDLogEvent[];
}

export interface Trip {
  distance_km: number;
  total_driving_hours: number;
  days_required: number;
  segments: Segment[];
  hos_schedule: HOSDay[];
  geometry: {
    type: string;
    coordinates: number[][];
  };
  markers: Marker[];
  eld_logs: ELDLogDay[];
}

function App() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegenerate = () => {
    setTrip(null);
    setLoading(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        tripGenerated={trip !== null}
        onRegenerate={handleRegenerate}
      />

      {!trip ? (
        <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-8 py-10 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl animate-fadeIn">
            <div>
              <TripForm
                setTrip={setTrip}
                setLoading={setLoading}
                setError={setError}
              />
            </div>

            <div>
              <TripSummary
                trip={trip}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </main>
      ) : (
        <main className="min-h-[calc(100vh-80px)] flex flex-col overflow-y-auto animate-slideIn">

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[35%] p-6">
              <TripSummary
                trip={trip}
                loading={loading}
                error={error}
              />
            </div>

            <div className="w-full lg:w-[65%] min-h-[650px] p-6">
              <RouteMap
                geometry={trip.geometry.coordinates}
                markers={trip.markers}
              />
            </div>
          </div>

          <div className="w-full px-6 pb-6">
            <ELDLog eldLogs={trip.eld_logs} />
          </div>

        </main>
      )}
    </div>
  );
}

export default App;