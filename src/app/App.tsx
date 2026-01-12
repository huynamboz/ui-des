import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { LoginScreen } from "./components/LoginScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { CostEstimateScreen } from "./components/CostEstimateScreen";
import { StatisticsScreen } from "./components/StatisticsScreen";
import { SettingsScreen, SettingsData } from "./components/SettingsScreen";

interface PriceData {
  current: number;
  dailyAvg: number;
  high: number;
  low: number;
  lastUpdated: Date;
}

// Mock function to simulate fetching spot price data
function fetchSpotPrice(): PriceData {
  // Simulate realistic price variations
  const basePrice = 10;
  const variation = Math.random() * 10 - 2;
  const current = Number((basePrice + variation).toFixed(1));

  return {
    current,
    dailyAvg: 10.2,
    high: 15.0,
    low: 8.0,
    lastUpdated: new Date(),
  };
}

export default function App() {
  const [priceData, setPriceData] = useState<PriceData>(fetchSpotPrice());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentScreen, setCurrentScreen] = useState<
    "home" | "login" | "dashboard" | "costEstimate" | "statistics" | "settings"
  >("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string>("");
  const [settings, setSettings] = useState<SettingsData>({
    wifi: { ssid: "", password: "" },
    consumption: { standard: 1.5, eco: 1.0 },
  });

  // Update current time every minute
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timeInterval);
  }, []);

  // Auto-refresh price every 30 minutes
  useEffect(() => {
    const priceInterval = setInterval(() => {
      setPriceData(fetchSpotPrice());
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(priceInterval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleEstimateCost = () => {
    setCurrentScreen("costEstimate");
  };

  const handleLogin = () => {
    setCurrentScreen("login");
  };

  const handleLoginSubmit = (username: string, pin: string) => {
    // Mock PIN validation (in real app, validate against backend)
    console.log(`Login attempt: ${username} with PIN: ${pin}`);
    setLoggedInUser(username);
    setIsLoggedIn(true);
    setCurrentScreen("dashboard");
  };

  const handleLoginCancel = () => {
    setCurrentScreen("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser("");
    setCurrentScreen("home");
  };

  const handleDashboardWashNow = () => {
    setCurrentScreen("costEstimate");
  };

  const handleDashboardStatistics = () => {
    setCurrentScreen("statistics");
  };

  const handleDashboardBack = () => {
    setCurrentScreen("home");
  };

  const handleStatisticsEstimateWash = () => {
    setCurrentScreen("costEstimate");
  };

  const handleStatisticsViewHistory = () => {
    // Navigate to history screen (placeholder for future)
    console.log("Navigate to history");
  };

  const handleStatisticsBack = () => {
    setCurrentScreen("dashboard");
  };

  const handleCostEstimateBack = () => {
    if (isLoggedIn) {
      setCurrentScreen("dashboard");
    } else {
      setCurrentScreen("home");
    }
  };

  const handleConfirmWash = () => {
    // Log the wash cycle (placeholder)
    console.log("Wash cycle confirmed");
    // Return to appropriate screen
    if (isLoggedIn) {
      setCurrentScreen("dashboard");
    } else {
      setCurrentScreen("home");
    }
  };

  const handleDashboardSettings = () => {
    setCurrentScreen("settings");
  };

  const handleSettingsBack = () => {
    setCurrentScreen("dashboard");
  };

  const handleSettingsSave = (newSettings: SettingsData) => {
    setSettings(newSettings);
    console.log("Settings saved:", newSettings);
    // In a real app, persist to storage here
    setCurrentScreen("dashboard");
  };

  // Show login screen
  if (currentScreen === "login") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoginScreen onCancel={handleLoginCancel} onLogin={handleLoginSubmit} />
      </div>
    );
  }

  // Show dashboard screen
  if (currentScreen === "dashboard" && isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <DashboardScreen
          username={loggedInUser}
          onLogout={handleLogout}
          onWashNow={handleDashboardWashNow}
          onStatistics={handleDashboardStatistics}
          onSettings={handleDashboardSettings}
          onBack={handleDashboardBack}
        />
      </div>
    );
  }

  // Show cost estimate screen
  if (currentScreen === "costEstimate") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <CostEstimateScreen
          currentPrice={priceData.current}
          onBack={handleCostEstimateBack}
          onConfirmWash={handleConfirmWash}
        />
      </div>
    );
  }

  // Show statistics screen
  if (currentScreen === "statistics") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <StatisticsScreen
          username={loggedInUser}
          onLogout={handleLogout}
          onEstimateWash={handleStatisticsEstimateWash}
          onViewHistory={handleStatisticsViewHistory}
          onBack={handleStatisticsBack}
        />
      </div>
    );
  }

  // Show settings screen
  if (currentScreen === "settings" && isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <SettingsScreen
          onBack={handleSettingsBack}
          onSave={handleSettingsSave}
          initialSettings={settings}
        />
      </div>
    );
  }

  // Show home screen
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* 480x480 screen container */}
      <div className="w-[480px] h-[480px] bg-white shadow-lg flex flex-col">
        {/* Header - 10% height */}
        <header className="h-[10%] bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="opacity-90">{formatDate(currentTime)}</span>
            <span className="opacity-90">{formatTime(currentTime)}</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-semibold">WashMan</h1>
            {isLoggedIn && (
              <span className="text-sm opacity-90">({loggedInUser})</span>
            )}
          </div>
        </header>

        {/* Main Content - 70% height */}
        <main className="h-[70%] flex flex-col items-center justify-center px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="text-center space-y-3 w-full">
            {/* Current Price - Large display */}
            <div className="space-y-1">
              <h2 className="text-gray-600 text-base">Spot Price:</h2>
              <div className="text-[168px] leading-none font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {priceData.current.toFixed(1)}
              </div>
              <div className="text-lg text-gray-500">snt/kWh</div>
            </div>

            {/* Daily Summary */}
            <div className="space-y-2 pt-3 border-t border-gray-200">
              <div className="text-sm">
                <span className="text-gray-600">Daily Avg: </span>
                <span className="font-semibold text-gray-800">
                  {priceData.dailyAvg.toFixed(1)} snt/kWh
                </span>
              </div>
              <div className="flex justify-center gap-6 text-sm">
                <div>
                  <span className="text-gray-600">High: </span>
                  <span className="font-semibold text-red-600">
                    {priceData.high.toFixed(1)}
                  </span>
                </div>
                <div className="text-gray-300">|</div>
                <div>
                  <span className="text-gray-600">Low: </span>
                  <span className="font-semibold text-green-600">
                    {priceData.low.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Action Buttons - 20% height */}
        <footer className="h-[20%] flex items-center justify-center gap-4 px-8 bg-gray-50 border-t border-gray-200">
          <Button
            onClick={handleEstimateCost}
            size="lg"
            className="flex-1 h-14 text-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
          >
            Wash Now
          </Button>
          <Button
            onClick={isLoggedIn ? handleLogout : handleLogin}
            size="lg"
            variant="outline"
            className="flex-1 h-14 text-lg border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </footer>
      </div>
    </div>
  );
}
