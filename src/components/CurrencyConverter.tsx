"use client";

import { useState, useEffect } from "react";
import { ExchangeRates, ConversionResult } from "@/types/currency";
import { BASE_CURRENCY, TARGET_CURRENCIES } from "@/lib/constants";
import { convertAmount } from "@/lib/utils";
import CurrencyInput from "./CurrencyInput";
import ConversionCard from "./ConversionCard";
import { getHistoricalChart } from "@/lib/getHistoricalChart";
import { ChartModal } from "@/components/ChartModal";

export default function CurrencyConverter() {
  // Handle conversion
  const [amount, setAmount] = useState<number>(1000);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [conversions, setConversions] = useState<ConversionResult[]>([]);

  // Handle historical data
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loadingChart, setLoadingChart] = useState(false);

  async function handleOpenChart(currency: string) {
    setSelectedCurrency(currency);
    debugger;
    setOpen(true);
    setLoadingChart(true);

    try {
      const result = await getHistoricalChart(currency);
      setChartData(result);
    } finally {
      setLoadingChart(false);
    }
  }

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates) {
      calculateConversions();
    }
  }, [amount, rates]);

  const fetchRates = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/rates");

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      const data: ExchangeRates = await response.json();
      setRates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const calculateConversions = () => {
    if (!rates) return;

    const audRate = rates.rates[BASE_CURRENCY];

    const results: ConversionResult[] = TARGET_CURRENCIES.map((currency) => {
      const targetRate = rates.rates[currency.code];
      const convertedAmount = convertAmount(amount, audRate, targetRate);

      return {
        currency: currency.code,
        amount: convertedAmount,
        rate: targetRate / audRate,
      };
    });

    setConversions(results);
  };

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exchange rates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchRates}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: "400px", margin:'auto' }}>
        <h1 className="text-center mb-8">Convert</h1>

        <CurrencyInput
          amount={amount}
          currency={BASE_CURRENCY}
          onAmountChange={handleAmountChange}
        />
        <br></br>

        <div className="space-y-3 mt-6 flex flex-col gap-[10px]">
          {conversions.map((conversion) => {
            const currencyInfo = TARGET_CURRENCIES.find(
              (c) => c.code === conversion.currency
            );
            return (
              <ConversionCard
                key={conversion.currency}
                currency={conversion.currency}
                flag={currencyInfo?.flag || ""}
                amount={conversion.amount}
                rate={conversion.rate}
                baseCurrency={BASE_CURRENCY}
                handleOpenChart={handleOpenChart}
              />
            );
          })}
        </div>
      </div>
      <ChartModal
        open={open}
        onClose={() => setOpen(false)}
        currency={selectedCurrency || ""}
        data={chartData}
        loading={loadingChart}
      />
    </>
  );
}
