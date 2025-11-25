export interface ExchangeRates {
    base: string;
    rates: Record<string, number>;
    timestamp: number;
  }
  
  export interface Currency {
    code: string;
    name: string;
    flag?: string;
  }
  
  export interface ConversionResult {
    currency: string;
    amount: number;
    rate: number;
  }
  
  export interface HistoricalData {
    date: string;
    rate: number;
  }
  
  export interface HistoricalResponse {
    base: string;
    rates: Record<string, number>;
    timestamp: number;
  }


  export interface ApiError {
    error: string;
  }