import { Button } from './ui/button';
import { LogOut, TrendingUp, Droplets, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface StatisticsScreenProps {
  username: string;
  onLogout: () => void;
  onBack: () => void;
  onEstimateWash: () => void;
  onViewHistory: () => void;
}

// Mock data for monthly costs
const monthlyData = [
  { month: 'Aug', cost: 12.5 },
  { month: 'Sep', cost: 15.2 },
  { month: 'Oct', cost: 11.8 },
  { month: 'Nov', cost: 14.3 },
  { month: 'Dec', cost: 18.7 },
];

const currentMonthStats = {
  totalCost: 18.7,
  totalWashes: 24,
  lastWashCost: 0.85,
};

export function StatisticsScreen({ username, onLogout, onBack, onEstimateWash, onViewHistory }: StatisticsScreenProps) {
  return (
    <div className="w-[480px] h-[480px] bg-white shadow-lg flex flex-col">
      {/* Header */}
      <header className="h-[12%] bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Statistics</h1>
        <button
          onClick={onLogout}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-5 bg-gradient-to-b from-white to-gray-50 overflow-y-auto">
        
        {/* Main Metric - This Month's Total Cost */}
        <div className="text-center mb-6 py-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200 shadow-md">
          <div className="text-sm text-gray-600 mb-2">This Month's Total Cost</div>
          <div className="text-7xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent leading-none">
            {currentMonthStats.totalCost.toFixed(1)}
          </div>
          <div className="text-2xl text-gray-600 mt-2">€</div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs text-gray-600">Total Washes</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{currentMonthStats.totalWashes}</div>
            <div className="text-xs text-gray-500 mt-1">This month</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-xs text-gray-600">Last Wash</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{currentMonthStats.lastWashCost.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">€</div>
          </div>
        </div>

        {/* Monthly Usage Chart */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-xs font-semibold text-gray-700 mb-3">Monthly Usage (€)</h3>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 10 }}
                  stroke="#999"
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  stroke="#999"
                  width={30}
                />
                <Bar 
                  dataKey="cost" 
                  radius={[4, 4, 0, 0]}
                >
                  {monthlyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={index === monthlyData.length - 1 ? 'url(#currentMonthGradient)' : '#cbd5e1'}
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="currentMonthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {/* Action Buttons */}
      <footer className="h-[18%] flex items-center justify-center gap-4 px-6 pb-4 bg-gray-50 border-t border-gray-200">
        <Button
          onClick={onEstimateWash}
          size="lg"
          variant="outline"
          className="flex-1 h-12 text-base border-orange-600 text-orange-600 hover:bg-orange-50"
        >
          Estimate Wash
        </Button>
        <Button
          onClick={onViewHistory}
          size="lg"
          className="flex-1 h-12 text-base bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
        >
          View History
        </Button>
      </footer>
    </div>
  );
}