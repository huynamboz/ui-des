import { Button } from "./ui/button";
import { Zap, Droplet, Wind, ChevronLeft } from "lucide-react";

interface CostEstimateScreenProps {
  currentPrice: number; // snt/kWh
  onConfirmWash: () => void;
  onBack: () => void;
}

const ENERGY_USAGE = {
  washing: 2, // kWh
  drying: 1, // kWh
  water: 30, // L
};

export function CostEstimateScreen({
  currentPrice,
  onConfirmWash,
  onBack,
}: CostEstimateScreenProps) {
  // Calculate total energy consumption
  const totalEnergy = ENERGY_USAGE.washing + ENERGY_USAGE.drying;

  // Calculate estimated cost in euros
  // currentPrice is in snt/kWh, so convert to euros (1 euro = 100 snt)
  const estimatedCost = (totalEnergy * currentPrice) / 100;

  return (
    <div className="w-[480px] h-[480px] bg-white shadow-lg flex flex-col">
      {/* Header */}
      <header className="h-[12%] bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 flex items-center justify-center relative">
        <button
          onClick={onBack}
          className="absolute left-4 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Cost Estimate</h1>
      </header>

      {/* Main Content */}
      <main className="h-[70%] px-6 py-4 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50 overflow-y-auto">
        {/* Current Price */}
        <div className="text-center mb-3">
          <div className="text-xs text-gray-600 mb-1">
            Current Electricity Price
          </div>
          <div className="text-xl font-semibold text-gray-800">
            {currentPrice.toFixed(1)}{" "}
            <span className="text-base text-gray-500">snt/kWh</span>
          </div>
        </div>

        {/* Energy Usage Breakdown */}
        <div className="space-y-2 mb-3 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-xs font-semibold text-gray-700 mb-2">
            Energy Usage:
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700">Washing</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {ENERGY_USAGE.washing} kWh
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <Wind className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm text-gray-700">Drying</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {ENERGY_USAGE.drying} kWh
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center">
                <Droplet className="w-4 h-4 text-cyan-600" />
              </div>
              <span className="text-sm text-gray-700">Water</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {ENERGY_USAGE.water} L
            </span>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Total Energy</span>
              <span className="text-sm font-semibold text-gray-800">
                {totalEnergy} kWh
              </span>
            </div>
          </div>
        </div>

        {/* Estimated Cost - Dominant Display */}
        <div className="text-center py-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200 shadow-md">
          <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
          <div className="text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent leading-none">
            {estimatedCost.toFixed(2)}
          </div>
          <div className="text-xl text-gray-600 mt-1">€</div>
        </div>
      </main>

      {/* Action Buttons */}
      <footer className="h-[18%] flex items-center justify-center px-6 bg-gray-50 border-t border-gray-200">
        <Button
          onClick={onConfirmWash}
          size="lg"
          className="w-full max-w-xs h-12 text-base bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
        >
          Confirm Wash
        </Button>
      </footer>
    </div>
  );
}
