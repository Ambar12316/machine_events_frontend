import { useState } from "react";
import StatsView from "./components/StatsView";
import JsonEventIngest from "./components/JsonEventIngest";
export default function App() {
  const [start, setStart] = useState("2026-01-15T00:00");
  const [end, setEnd] = useState("2026-01-15T18:00");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Machine Events Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <JsonEventIngest />
          <StatsView
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
          />
        </div>
      </div>
    </div>
  );
}
