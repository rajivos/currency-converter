// src/lib/constants.ts

import { Currency } from '@/types/currency';

export const BASE_CURRENCY = 'AUD';

export const TARGET_CURRENCIES: Currency[] = [
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
];