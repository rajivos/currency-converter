import { NextResponse } from 'next/server';
import { ExchangeRateService } from '@/lib/ExchangeRateService';

export async function GET() {
  try {
    const apiKey = process.env.EXCHANGE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const service = new ExchangeRateService(apiKey);
    const rates = await service.getLatestRates();

    return NextResponse.json(rates);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rates' },
      { status: 500 }
    );
  }
}