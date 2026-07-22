import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

interface HeaderProps {
  tripGenerated: boolean;
  onRegenerate: () => void;
}

function Header({
  tripGenerated,
  onRegenerate,
}: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-blue-900 shadow-md">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* Logo & Title */}

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md">

              <Truck
                className="text-blue-700"
                size={34}
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold tracking-tight text-white">
                Smart Truck Trip Planner
              </h1>

              <p className="text-blue-100 mt-1">
                FMCSA Hours of Service Route Planning System
              </p>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex flex-wrap items-center gap-4">

            {tripGenerated && (

              <button
                onClick={onRegenerate}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  font-semibold
                  text-slate-800
                  shadow-md
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-blue-50
                  hover:text-blue-700
                "
              >

                <RotateCcw size={18} />

                Regenerate Trip

              </button>

            )}

            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium shadow-sm">

              <ShieldCheck
                size={18}
              />

              FMCSA Compliant

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;