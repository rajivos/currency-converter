import { NextResponse } from 'next/server';
import { ExchangeRateService } from '@/lib/ExchangeRateService';
import { getLast14Days } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currency = searchParams.get('currency');

    if (!currency) {
      return NextResponse.json(
        { error: 'Currency parameter is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.EXCHANGE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const service = new ExchangeRateService(apiKey);
    const dates = getLast14Days();

    const historicalPromises = dates.map(date =>
      service.getHistoricalRates(date)
    );

    const historicalData = await Promise.all(historicalPromises);

    const chartData = historicalData.map((data, index) => ({
      date: dates[index],
      rate: data.rates[currency] || 0,
    }));

    return NextResponse.json({
      currency,
      data: chartData,
    });
  } catch (error) {
    console.error('Error fetching historical rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical rates' },
      { status: 500 }
    );
  }
}