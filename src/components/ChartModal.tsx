import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { HistoricalData } from "@/types/currency";

interface ChartModalProps {
  open: boolean;
  onClose: () => void;
  currency: string;
  data: HistoricalData[];
  loading: boolean;
}

export function ChartModal({ open, onClose, currency, data, loading } : ChartModalProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setReady(true));
    } else {
      setReady(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50
                 opacity-100 animate-fadeIn"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 transform animate-scaleIn"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-gray-900">
            {currency}/USD — Last 14 Days
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {loading || !ready ? (
          <div className="h-72 flex items-center justify-center text-gray-500">
            Loading…
          </div>
        ) : (
          <div className="w-full" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  stroke="#d1d5db"
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  stroke="#d1d5db"
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#6b7280", fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <button
          className="w-full mt-6 bg-gray-900 text-white py-2.5 rounded-xl 
                     text-lg font-medium hover:bg-gray-800 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
