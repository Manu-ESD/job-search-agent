export interface MetalPrice {
  metal: 'gold' | 'silver';
  price: number;
  currency: string;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  timestamp: Date;
  unit: 'oz' | 'g' | 'kg';
}

export interface HistoricalPrice {
  date: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface PriceAlert {
  id: string;
  metal: 'gold' | 'silver';
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: Date;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface ConversionResult {
  fromAmount: number;
  fromUnit: string;
  toAmount: number;
  toUnit: string;
  metal: 'gold' | 'silver';
  pricePerUnit: number;
}

export type TimeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'ALL';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: Date;
  imageUrl?: string;
}
