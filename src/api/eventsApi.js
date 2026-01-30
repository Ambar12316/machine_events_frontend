import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const ingestBatch = (events) =>
  api.post("/events/batch", events);

export const getStats = (params) =>
  api.get("/stats", { params });

export const getTopDefectLines = (params) =>
  api.get("/stats/top-defect-lines", { params });

export const ingestEventsJson = (jsonArray) =>
  api.post("/events/batch", jsonArray, {
    headers: { "Content-Type": "application/json" },
  });
