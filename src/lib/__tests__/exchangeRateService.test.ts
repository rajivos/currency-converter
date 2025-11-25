// src/lib/__tests__/exchangeRateService.test.ts

import { ExchangeRateService } from '../ExchangeRateService';

// Mock fetch globally
global.fetch = jest.fn();

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  const mockApiKey = '';

  beforeEach(() => {
    service = new ExchangeRateService(mockApiKey);
    jest.clearAllMocks();
  });

  describe('getLatestRates', () => {
    it('should fetch latest rates successfully', async () => {
      const mockResponse = {
        base: 'USD',
        rates: {
          AUD: 1.52,
          EUR: 0.92,
          GBP: 0.79,
        },
        timestamp: 1234567890,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await service.getLatestRates();

      expect(global.fetch).toHaveBeenCalledWith(
        `https://openexchangerates.org/api/latest.json?app_id=${mockApiKey}`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when API request fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized',
      });

      await expect(service.getLatestRates()).rejects.toThrow(
        'Failed to fetch rates: Unauthorized'
      );
    });

    it('should throw error on network failure', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(service.getLatestRates()).rejects.toThrow('Network error');
    });
  });

  describe('getHistoricalRates', () => {
    it('should fetch historical rates for a specific date', async () => {
      const date = '2024-11-01';
      const mockResponse = {
        base: 'USD',
        rates: {
          AUD: 1.51,
          EUR: 0.91,
        },
        timestamp: 1234567890,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await service.getHistoricalRates(date);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://openexchangerates.org/api/historical/${date}.json?app_id=${mockApiKey}`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when historical request fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(service.getHistoricalRates('2024-11-01')).rejects.toThrow(
        'Failed to fetch historical rates: Not Found'
      );
    });
  });
});