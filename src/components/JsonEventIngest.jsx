import { useState } from "react";
import { ingestEventsJson } from "../api/eventsApi";

export default function JsonEventIngest() {
  const [jsonText, setJsonText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const ingest = async () => {
    try {
      setError(null);
      setResult(null);
      setLoading(true);

      const parsed = JSON.parse(jsonText);

      if (!Array.isArray(parsed)) {
        throw new Error("JSON must be an array of events");
      }

      const res = await ingestEventsJson(parsed);
      setResult(res.data);
    } catch (err) {
      setError(err.message || "Invalid JSON or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Ingest Events (JSON)
      </h2>

      <textarea
        rows={10}
        placeholder='Paste JSON array here...'
        className="w-full font-mono text-sm border rounded p-3 mb-3"
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />

      <button
        onClick={ingest}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Ingesting..." : "Ingest Events"}
      </button>

      {error && (
        <p className="text-red-600 mt-3 text-sm">{error}</p>
      )}

      {result && (
        <div className="mt-3 text-sm space-y-1">
          <p>Accepted: {result.accepted}</p>
          <p>Rejected: {result.rejected}</p>
        </div>
      )}
    </div>
  );
}
