import { MetalPrice, HistoricalPrice, TimeRange } from '../types';

// Using free APIs for metal prices
// Primary: GoldAPI.io or fallback to mock data for demo
// In production, add your API key: const GOLD_API_KEY = process.env.REACT_APP_GOLD_API_KEY;

// Simulated real-time prices
const BASE_GOLD_PRICE = 2650; // USD per oz
const BASE_SILVER_PRICE = 31.50; // USD per oz

// Generate realistic price with small variations
const generateRealisticPrice = (basePrice: number, volatility: number = 0.02): number => {
  const variation = (Math.random() - 0.5) * 2 * volatility * basePrice;
  return Math.round((basePrice + variation) * 100) / 100;
};

// Generate historical data
const generateHistoricalData = (
  basePrice: number,
  days: number,
  trend: number = 0.0001
): HistoricalPrice[] => {
  const data: HistoricalPrice[] = [];
  const now = new Date();
  let currentPrice = basePrice * (1 - trend * days);

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const dailyChange = (Math.random() - 0.48) * 0.03 * currentPrice;
    currentPrice = Math.max(currentPrice + dailyChange, basePrice * 0.7);
    
    const high = currentPrice * (1 + Math.random() * 0.015);
    const low = currentPrice * (1 - Math.random() * 0.015);
    const open = low + Math.random() * (high - low);
    const close = low + Math.random() * (high - low);

    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(close * 100) / 100,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
    });
  }

  return data;
};

export const fetchCurrentPrices = async (): Promise<{ gold: MetalPrice; silver: MetalPrice }> => {
  // In production, replace with actual API call
  // const response = await axios.get(`https://www.goldapi.io/api/XAU/USD`, {
  //   headers: { 'x-access-token': GOLD_API_KEY }
  // });

  const goldPrice = generateRealisticPrice(BASE_GOLD_PRICE);
  const silverPrice = generateRealisticPrice(BASE_SILVER_PRICE);
  
  const goldChange = (Math.random() - 0.5) * 40;
  const silverChange = (Math.random() - 0.5) * 0.8;

  return {
    gold: {
      metal: 'gold',
      price: goldPrice,
      currency: 'USD',
      change: Math.round(goldChange * 100) / 100,
      changePercent: Math.round((goldChange / goldPrice) * 10000) / 100,
      high24h: goldPrice * 1.008,
      low24h: goldPrice * 0.992,
      timestamp: new Date(),
      unit: 'oz',
    },
    silver: {
      metal: 'silver',
      price: silverPrice,
      currency: 'USD',
      change: Math.round(silverChange * 100) / 100,
      changePercent: Math.round((silverChange / silverPrice) * 10000) / 100,
      high24h: silverPrice * 1.012,
      low24h: silverPrice * 0.988,
      timestamp: new Date(),
      unit: 'oz',
    },
  };
};

export const fetchHistoricalPrices = async (
  metal: 'gold' | 'silver',
  timeRange: TimeRange
): Promise<HistoricalPrice[]> => {
  const basePrice = metal === 'gold' ? BASE_GOLD_PRICE : BASE_SILVER_PRICE;
  
  const daysMap: Record<TimeRange, number> = {
    '1D': 1,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    '5Y': 1825,
    'ALL': 3650,
  };

  const days = daysMap[timeRange];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return generateHistoricalData(basePrice, days);
};

// Currency conversion rates (simplified)
export const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12,
  AUD: 1.53,
  CAD: 1.36,
  JPY: 149.50,
  CNY: 7.24,
  CHF: 0.88,
  AED: 3.67,
};

export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
];

// Weight conversion factors (to troy ounces)
export const WEIGHT_CONVERSIONS: Record<string, number> = {
  oz: 1,
  g: 0.0321507,
  kg: 32.1507,
  tola: 0.375,
  tael: 1.20337,
};

export const convertPrice = (
  pricePerOz: number,
  fromCurrency: string,
  toCurrency: string,
  unit: string = 'oz'
): number => {
  const priceInUSD = pricePerOz / CURRENCY_RATES[fromCurrency];
  const priceInTargetCurrency = priceInUSD * CURRENCY_RATES[toCurrency];
  const weightFactor = WEIGHT_CONVERSIONS[unit] || 1;
  return Math.round((priceInTargetCurrency * weightFactor) * 100) / 100;
};

// Fetch market news (mock data for demo)
export const fetchMarketNews = async () => {
  return [
    {
      id: '1',
      title: 'Gold Prices Surge Amid Global Economic Uncertainty',
      summary: 'Investors flock to safe-haven assets as market volatility increases.',
      url: '#',
      source: 'Market Watch',
      publishedAt: new Date(),
    },
    {
      id: '2',
      title: 'Silver Demand Rises with Green Energy Transition',
      summary: 'Industrial demand for silver increases due to solar panel production.',
      url: '#',
      source: 'Bloomberg',
      publishedAt: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      title: 'Central Banks Continue Gold Buying Spree',
      summary: 'Global central banks add to gold reserves for the third consecutive quarter.',
      url: '#',
      source: 'Reuters',
      publishedAt: new Date(Date.now() - 7200000),
    },
  ];
};
