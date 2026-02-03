import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronLeft, Wifi, Globe, ChevronRight } from "lucide-react";

export interface CommissionData {
  timezone: string;
  wifi: { ssid: string; password: string };
}

interface CommissionScreenProps {
  onComplete: (data: CommissionData) => void;
  initialData?: Partial<CommissionData>;
}

const COMMON_TIMEZONES = [
  "Europe/Helsinki",
  "Europe/Stockholm",
  "Europe/Oslo",
  "Europe/Copenhagen",
  "UTC",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Ho_Chi_Minh",
];

const defaultData: CommissionData = {
  timezone: "Europe/Helsinki",
  wifi: { ssid: "", password: "" },
};

type CommissionView = "main" | "timezone" | "wifi";

export function CommissionScreen({
  onComplete,
  initialData,
}: CommissionScreenProps) {
  const [view, setView] = useState<CommissionView>("main");
  const [data, setData] = useState<CommissionData>({
    ...defaultData,
    ...initialData,
  });

  const handleComplete = () => {
    onComplete(data);
  };

  const updateWifi = (field: "ssid" | "password", value: string) => {
    setData((prev) => ({
      ...prev,
      wifi: { ...prev.wifi, [field]: value },
    }));
  };

  return (
    <div className="w-[480px] h-[480px] bg-white shadow-lg flex flex-col">
      {view === "main" && (
        <>
          {/* Header */}
          <header className="h-[15%] bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Commission</h1>
          </header>

          {/* Main: 2 options */}
          <main className="flex-1 px-6 py-6 flex flex-col gap-4 bg-gradient-to-b from-white to-gray-50">
            <div className="flex justify-center mb-2">
              <img src="/logodanaexperts.png" alt="DANA Experts" className="h-12 w-auto" />
            </div>

            <button
              type="button"
              onClick={() => setView("timezone")}
              className="flex items-center justify-between w-full p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50 transition-all text-left active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Setting Timezone
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">
                    {data.timezone}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>

            <button
              type="button"
              onClick={() => setView("wifi")}
              className="flex items-center justify-between w-full p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50 transition-all text-left active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0">
                  <Wifi className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Setting WiFi
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">
                    {data.wifi.ssid || "Not configured"}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          </main>

          {/* Footer: Continue */}
          <footer className="h-[15%] flex items-center justify-center px-6 bg-gray-50 border-t border-gray-200">
            <Button
              onClick={handleComplete}
              size="lg"
              className="w-full max-w-xs h-12 text-base bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 gap-2"
            >
              Continue
            </Button>
          </footer>
        </>
      )}

      {view === "timezone" && (
        <>
          <header className="h-[15%] bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 flex items-center justify-center relative">
            <button
              onClick={() => setView("main")}
              className="absolute left-4 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Setting Timezone</h1>
          </header>
          <main className="flex-1 px-6 py-6 bg-gradient-to-b from-white to-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <Select
              value={data.timezone}
              onValueChange={(v) =>
                setData((prev) => ({ ...prev, timezone: v }))
              }
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMMON_TIMEZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </main>
          <footer className="h-[15%] flex items-center justify-center px-6 bg-gray-50 border-t border-gray-200">
            <Button
              onClick={() => setView("main")}
              size="lg"
              className="w-full max-w-xs h-12 text-base bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            >
              Save
            </Button>
          </footer>
        </>
      )}

      {view === "wifi" && (
        <>
          <header className="h-[15%] bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 flex items-center justify-center relative">
            <button
              onClick={() => setView("main")}
              className="absolute left-4 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Setting WiFi</h1>
          </header>
          <main className="flex-1 px-6 py-6 overflow-y-auto bg-gradient-to-b from-white to-gray-50 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SSID (Network name)
              </label>
              <Input
                type="text"
                value={data.wifi.ssid}
                onChange={(e) => updateWifi("ssid", e.target.value)}
                placeholder="Enter WiFi network name"
                className="h-11 text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={data.wifi.password}
                onChange={(e) => updateWifi("password", e.target.value)}
                placeholder="Enter WiFi password"
                className="h-11 text-base"
              />
            </div>
          </main>
          <footer className="h-[15%] flex items-center justify-center px-6 bg-gray-50 border-t border-gray-200">
            <Button
              onClick={() => setView("main")}
              size="lg"
              className="w-full max-w-xs h-12 text-base bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            >
              Save
            </Button>
          </footer>
        </>
      )}
    </div>
  );
}
