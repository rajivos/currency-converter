import { ExchangeRates, HistoricalResponse } from '@/types/currency';

const API_BASE = 'https://openexchangerates.org/api';

const DEFAULT_CURRENCY = "USD"

export class ExchangeRateService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getLatestRates(): Promise<ExchangeRates> {
    const response = await fetch(
      `${API_BASE}/latest.json?app_id=${this.apiKey}&base=${DEFAULT_CURRENCY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch rates: ${response.statusText}`);
    }

    return response.json();
  }

  async getHistoricalRates(date: string): Promise<HistoricalResponse> {
    const response = await fetch(
      `${API_BASE}/historical/${date}.json?app_id=${this.apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch historical rates: ${response.statusText}`);
    }

    return response.json();
  }
}