"use client";

import { formatCurrency } from "@/lib/utils";

interface ConversionCardProps {
  currency: string;
  flag: string;
  amount: number;
  rate: number;
  baseCurrency: string;
  handleOpenChart: any;
}

const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    NZD: "$",
    CAD: "$",
  };
  return symbols[currency] || "$";
};

export default function ConversionCard({
  currency,
  flag,
  amount,
  rate,
  baseCurrency,
  handleOpenChart,
}: ConversionCardProps) {
  const symbol = getCurrencySymbol(currency);

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer py-8"
      onClick={() => handleOpenChart(currency)}
    >
      <div className="flex items-center justify-center gap-[90px] py-8 mt-8">
        <div className="flex h-full items-center space-x-3 gap-[10px] mt-8">
          <span className="text-3xl">{flag} </span>
          <span className="text-xl pl-3"> {currency}</span>
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-gray-800 mb-3 pt-4 pb-4">
            {symbol} {formatCurrency(amount)}
          </div>
          <div className="text-md text-gray-700">
            1 {baseCurrency} = {formatCurrency(rate, 4)} {currency}
          </div>
        </div>
      </div>
    </div>
  );
}
