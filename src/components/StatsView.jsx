import { useState } from "react";
import { getStats } from "../api/eventsApi";

export default function StatsView() {
  const [machineId, setMachineId] = useState("");
  const [start, setStart] = useState("2026-01-15T00:00");
  const [end, setEnd] = useState("2026-01-15T18:00");
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await getStats({
      machineId,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    });
    setStats(res.data);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Machine Stats</h2>

      <input
        placeholder="Machine ID"
        className="w-full mb-3 px-3 py-2 border rounded"
        onChange={(e) => setMachineId(e.target.value)}
      />

      <label className="text-sm text-gray-600">Start Time</label>
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <label className="text-sm text-gray-600">End Time</label>
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded"
      />

      <button
        onClick={fetchStats}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Fetch Stats
      </button>

      {stats && (
        <div className="mt-4 text-sm space-y-1">
          <p><b>Events:</b> {stats.eventsCount}</p>
          <p><b>Defects:</b> {stats.defectsCount}</p>
          <p><b>Avg Rate:</b> {stats.avgDefectRate}</p>
          <p><b>Status:</b> {stats.status}</p>

          {stats.eventsCount === 0 && (
            <p className="text-gray-500 mt-2">
              No data available for selected time range
            </p>
          )}
        </div>
      )}
    </div>
  );
}
