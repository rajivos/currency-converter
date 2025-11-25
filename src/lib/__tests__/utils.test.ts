import { formatCurrency, convertAmount, getLast14Days } from '../utils';

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('should format number to 2 decimal places by default', () => {
      expect(formatCurrency(100)).toBe('100.00');
      expect(formatCurrency(100.5)).toBe('100.50');
      expect(formatCurrency(100.567)).toBe('100.57');
    });

    it('should format number to specified decimal places', () => {
      expect(formatCurrency(100.12345, 4)).toBe('100.1235');
      expect(formatCurrency(100, 0)).toBe('100');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('0.00');
    });

    it('should handle negative numbers', () => {
      expect(formatCurrency(-100.5)).toBe('-100.50');
    });
  });

  describe('convertAmount', () => {
    it('should correctly convert between currencies', () => {
      // 100 AUD at rate 1.5, to USD at rate 1.0
      // Formula: (100 / 1.5) * 1.0 = 66.67
      const result = convertAmount(100, 1.5, 1.0);
      expect(result).toBeCloseTo(66.67, 2);
    });

    it('should handle same currency conversion', () => {
      const result = convertAmount(100, 1.0, 1.0);
      expect(result).toBe(100);
    });

    it('should handle zero amount', () => {
      const result = convertAmount(0, 1.5, 1.0);
      expect(result).toBe(0);
    });

    it('should handle decimal amounts', () => {
      const result = convertAmount(50.5, 1.5, 2.0);
      expect(result).toBeCloseTo(67.33, 2);
    });
  });

  describe('getLast14Days', () => {
    it('should return array of 14 dates', () => {
      const dates = getLast14Days();
      expect(dates).toHaveLength(14);
    });

    it('should return dates in YYYY-MM-DD format', () => {
      const dates = getLast14Days();
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      dates.forEach(date => {
        expect(date).toMatch(dateRegex);
      });
    });

    it('should return dates in chronological order', () => {
      const dates = getLast14Days();
      for (let i = 1; i < dates.length; i++) {
        expect(new Date(dates[i])).toBeInstanceOf(Date);
        expect(new Date(dates[i]).getTime()).toBeGreaterThan(
          new Date(dates[i - 1]).getTime()
        );
      }
    });

    it('should include today as the last date', () => {
      const dates = getLast14Days();
      const today = new Date().toISOString().split('T')[0];
      expect(dates[dates.length - 1]).toBe(today);
    });
  });
});