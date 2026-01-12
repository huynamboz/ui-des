import { Button } from "./ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft } from "lucide-react";

interface DashboardScreenProps {
  username: string;
  onLogout: () => void;
  onBack: () => void;
  onWashNow: () => void;
  onStatistics: () => void;
  onSettings: () => void;
}

// Mock usage history data
const usageHistory = [
  { date: "Dec 20", cost: 0.85, kwh: 1.5 },
  { date: "Dec 15", cost: 0.6, kwh: 1.2 },
  { date: "Dec 10", cost: 0.72, kwh: 1.4 },
  { date: "Dec 5", cost: 0.55, kwh: 1.1 },
  { date: "Nov 28", cost: 0.9, kwh: 1.6 },
  { date: "Nov 22", cost: 0.68, kwh: 1.3 },
  { date: "Nov 18", cost: 0.75, kwh: 1.4 },
  { date: "Nov 12", cost: 0.82, kwh: 1.5 },
];

const metrics = {
  costPerWash: 5.67,
  totalCost: 5.6,
  totalCycles: 8,
  avgCost: 0.71,
};

export function DashboardScreen({
  username,
  onLogout,
  onBack,
  onWashNow,
  onStatistics,
  onSettings,
}: DashboardScreenProps) {
  return (
    <div className="w-[480px] h-[480px] bg-white shadow-lg flex flex-col">
      {/* Header - 15% height */}
      <header className="h-[15%] bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <Button
          onClick={onLogout}
          size="sm"
          variant="outline"
          className="bg-white/90 text-orange-600 border-white hover:bg-white hover:text-orange-700"
        >
          Logout
        </Button>
      </header>

      {/* Metrics - 30% height */}
      <div className="h-[30%] px-6 py-4 bg-gradient-to-b from-orange-50 to-white border-b border-gray-200">
        {/* Cost per wash - prominent */}
        <div className="mb-3">
          <div className="text-sm text-gray-600">Cost per wash:</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            {metrics.costPerWash.toFixed(2)} €
          </div>
        </div>

        {/* Other metrics in a row */}
        <div className="flex justify-between text-sm">
          <div>
            <div className="text-gray-600">Total Cost</div>
            <div className="font-semibold text-gray-800">
              {metrics.totalCost.toFixed(1)} €
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600">Cycles</div>
            <div className="font-semibold text-gray-800">
              {metrics.totalCycles}
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-600">Avg Cost</div>
            <div className="font-semibold text-gray-800">
              {metrics.avgCost.toFixed(2)} €
            </div>
          </div>
        </div>
      </div>

      {/* Usage History - 40% height */}
      <div className="h-[40%] px-6 py-3 overflow-y-auto">
        <h2 className="text-base font-semibold text-gray-700 mb-2">
          Usage History
        </h2>

        {/* Simple list */}
        <div className="space-y-1 mb-3 text-sm">
          {usageHistory.slice(0, 3).map((entry, index) => (
            <div
              key={index}
              className="flex justify-between py-1 border-b border-gray-100"
            >
              <span className="text-gray-600">{entry.date}</span>
              <span className="font-semibold text-gray-800">
                {entry.cost.toFixed(2)} €{" "}
                <span className="text-gray-500">({entry.kwh} kWh)</span>
              </span>
            </div>
          ))}
        </div>

        {/* Simple Bar Chart */}
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#999" />
              <YAxis
                tick={{ fontSize: 10 }}
                stroke="#999"
                label={{
                  value: "€",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 10 },
                }}
              />
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(value: number) => [`${value.toFixed(2)} €`, "Cost"]}
              />
              <Bar
                dataKey="cost"
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Buttons - 15% height */}
      <footer className="h-[15%] flex items-center justify-center gap-3 px-6 bg-gray-50 border-t border-gray-200">
        <Button
          onClick={onSettings}
          size="lg"
          variant="outline"
          className="flex-1 h-12 border-gray-400 text-gray-700 hover:bg-gray-100"
        >
          Settings
        </Button>
        <Button
          onClick={onStatistics}
          size="lg"
          variant="outline"
          className="flex-1 h-12 border-orange-600 text-orange-600 hover:bg-orange-50"
        >
          Statistics
        </Button>
        <Button
          onClick={onWashNow}
          size="lg"
          className="flex-1 h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
        >
          Wash Now
        </Button>
      </footer>
    </div>
  );
}
