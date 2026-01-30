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
        throw new Error("JSON must be an array of event objects");
      }

      const res = await ingestEventsJson(parsed);
      setResult(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Invalid JSON or server error"
      );
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
        className="w-full font-mono text-sm border rounded p-3 mb-3"
        placeholder="Paste JSON array here..."
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

      {/* Error */}
      {error && (
        <p className="text-red-600 mt-3 text-sm">{error}</p>
      )}

      {/* Result */}
      {result && (
        <div className="mt-4 text-sm space-y-2">
          <p className="font-medium">Ingestion Summary</p>

          <div className="grid grid-cols-2 gap-2">
            <p>✅ Accepted:</p>
            <p>{result.accepted ?? 0}</p>

            <p>🔄 Updated:</p>
            <p>{result.updated ?? 0}</p>

            <p>🧹 Deduped:</p>
            <p>{result.deduped ?? 0}</p>

            <p>❌ Rejected:</p>
            <p>{result.rejected ?? 0}</p>
          </div>

          {/* Rejection reasons */}
          {result.rejectionReasons &&
            Object.keys(result.rejectionReasons).length > 0 && (
              <div className="mt-3">
                <p className="font-medium mb-1">
                  Rejection Reasons
                </p>
                <ul className="list-disc list-inside text-red-600">
                  {Object.entries(result.rejectionReasons).map(
                    ([reason, count]) => (
                      <li key={reason}>
                        {reason.replaceAll("_", " ")} ({count})
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
