import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronLeft, Wifi, Zap, Users, Save } from "lucide-react";

interface SettingsScreenProps {
  onBack: () => void;
  onSave: (settings: SettingsData) => void;
  initialSettings?: SettingsData;
}

export interface SettingsData {
  wifi: {
    ssid: string;
    password: string;
  };
  consumption: {
    standard: number; // kWh
    eco: number; // kWh
  };
}

const defaultSettings: SettingsData = {
  wifi: {
    ssid: "",
    password: "",
  },
  consumption: {
    standard: 1.5,
    eco: 1.0,
  },
};

export function SettingsScreen({
  onBack,
  onSave,
  initialSettings = defaultSettings,
}: SettingsScreenProps) {
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    onSave(settings);
  };

  const updateWifi = (field: "ssid" | "password", value: string) => {
    setSettings((prev) => ({
      ...prev,
      wifi: { ...prev.wifi, [field]: value },
    }));
  };

  const updateConsumption = (field: "standard" | "eco", value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setSettings((prev) => ({
        ...prev,
        consumption: { ...prev.consumption, [field]: numValue },
      }));
    }
  };

  return (
    <div className="w-[480px] h-[480px] bg-white shadow-lg flex flex-col">
      {/* Header - 15% */}
      <header className="h-[15%] bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 flex items-center justify-center relative">
        <button
          onClick={onBack}
          className="absolute left-4 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>

      {/* Scrollable Content - 70% */}
      <main className="h-[70%] px-6 py-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/logodanaexperts.png" alt="DANA Experts" className="h-10 w-auto" />
        </div>

        {/* Wi-Fi Configuration Section */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              Wi-Fi Configuration
            </h2>
          </div>

          <div className="space-y-3 ml-10">
            <div>
              <label className="block text-sm text-gray-600 mb-1">SSID</label>
              <Input
                type="text"
                value={settings.wifi.ssid}
                onChange={(e) => updateWifi("ssid", e.target.value)}
                placeholder="Enter Wi-Fi network name"
                className="h-10 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={settings.wifi.password}
                  onChange={(e) => updateWifi("password", e.target.value)}
                  placeholder="Enter Wi-Fi password"
                  className="h-10 text-sm pr-20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-orange-600 hover:text-orange-700 font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cycle Consumption Section */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              Cycle Consumption
            </h2>
          </div>

          <div className="ml-10 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">
                Standard Cycle
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  value={settings.consumption.standard}
                  onChange={(e) =>
                    updateConsumption("standard", e.target.value)
                  }
                  className="h-10 text-sm w-24"
                />
                <span className="text-sm text-gray-600">kWh</span>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">
                Eco Cycle
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  value={settings.consumption.eco}
                  onChange={(e) => updateConsumption("eco", e.target.value)}
                  className="h-10 text-sm w-24"
                />
                <span className="text-sm text-gray-600">kWh</span>
              </div>
            </div>
          </div>
        </section>

        {/* User Management Section */}
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              User Management
            </h2>
          </div>

          <div className="ml-10 flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-sm border-gray-400 text-gray-700 hover:bg-gray-100"
            >
              Add User
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-sm border-gray-400 text-gray-700 hover:bg-gray-100"
            >
              Edit Users
            </Button>
          </div>
        </section>
      </main>

      {/* Footer - Save Button - 15% */}
      <footer className="h-[15%] flex items-center justify-center px-6 bg-gray-50 border-t border-gray-200">
        <Button
          onClick={handleSave}
          size="lg"
          className="w-full max-w-xs h-12 text-base bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 gap-2"
        >
          Save Changes
        </Button>
      </footer>
    </div>
  );
}
