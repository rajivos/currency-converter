"use client";

import { useEffect, useRef, useState } from "react";

interface CurrencyInputProps {
  amount: number;
  currency: string;
  onAmountChange: (amount: number) => void;
}

const FLAG_MAP: Record<string, string> = {
  AUD: "🇦🇺",
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  NZD: "🇳🇿",
  CAD: "🇨🇦",
};

export default function CurrencyInput({
  amount,
  currency,
  onAmountChange,
}: CurrencyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");

    setLocalValue(e.target.value);

    const numValue = parseFloat(value);

    if (!isNaN(numValue) && numValue >= 0) {
      onAmountChange(numValue);
    } else if (value === "") {
      onAmountChange(0);
      setLocalValue("");
    }
  };

  const handleBlur = () => {
    const value = localValue.replace(/,/g, "");
    const numValue = parseFloat(value);

    if (!isNaN(numValue) && numValue >= 0) {
      setLocalValue(
        numValue.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    } else {
      setLocalValue("0.00");
    }
  };

  return (
    <div
      className="bg-white rounded-2xl border-2 border-transparent p-4 shadow-sm focus-within:shadow-md transition-all"
      style={{ borderColor: "transparent" }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#3b82f6";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-3 gap-[10px]">
          <span className="text-3xl">{FLAG_MAP[currency]}</span>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-800">
              {currency}
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="text-2xl font-semibold text-gray-800 text-right outline-none w-36 bg-transparent"
          name="amount"
          placeholder="Enter amount"
          aria-label="Enter amount"
          aria-required="true"
          aria-describedby="amount-description"
          aria-invalid="false"
          aria-autocomplete="none"
          style={{ width: "224px" }}
        />
      </div>
    </div>
  );
}
