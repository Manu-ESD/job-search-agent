import React, { useState, useMemo } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import { CURRENCIES, CURRENCY_RATES, WEIGHT_CONVERSIONS } from '../services/api';
import './Calculator.css';

interface CalculatorProps {
  goldPrice: number;
  silverPrice: number;
}

const WEIGHT_UNITS = [
  { code: 'oz', name: 'Troy Ounce' },
  { code: 'g', name: 'Gram' },
  { code: 'kg', name: 'Kilogram' },
  { code: 'tola', name: 'Tola' },
  { code: 'tael', name: 'Tael' },
];

const Calculator: React.FC<CalculatorProps> = ({ goldPrice, silverPrice }) => {
  const [metal, setMetal] = useState<'gold' | 'silver'>('gold');
  const [amount, setAmount] = useState<string>('1');
  const [unit, setUnit] = useState<string>('oz');
  const [currency, setCurrency] = useState<string>('USD');

  const calculatedValue = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const basePrice = metal === 'gold' ? goldPrice : silverPrice;
    const weightInOz = numAmount * WEIGHT_CONVERSIONS[unit];
    const priceInUSD = basePrice * weightInOz;
    const finalPrice = priceInUSD * CURRENCY_RATES[currency];
    return finalPrice;
  }, [metal, amount, unit, currency, goldPrice, silverPrice]);

  const selectedCurrency = CURRENCIES.find(c => c.code === currency);

  return (
    <section className="calculator-container" aria-label="Metal value calculator">
      <header className="calculator-header">
        <CalcIcon className="calc-icon" />
        <h3>Value Calculator</h3>
      </header>

      <div className="calculator-body">
        <div className="metal-toggle">
          <button
            className={`toggle-btn ${metal === 'gold' ? 'active gold' : ''}`}
            onClick={() => setMetal('gold')}
            aria-pressed={metal === 'gold'}
          >
            🥇 Gold
          </button>
          <button
            className={`toggle-btn ${metal === 'silver' ? 'active silver' : ''}`}
            onClick={() => setMetal('silver')}
            aria-pressed={metal === 'silver'}
          >
            🥈 Silver
          </button>
        </div>

        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            placeholder="Enter amount"
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="unit">Weight Unit</label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              {WEIGHT_UNITS.map((u) => (
                <option key={u.code} value={u.code}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-display">
          <span className="result-label">Total Value</span>
          <span className="result-value">
            {selectedCurrency?.symbol}
            {calculatedValue.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="result-meta">
            {amount || '0'} {WEIGHT_UNITS.find(u => u.code === unit)?.name} of {metal}
          </span>
        </div>

        <div className="price-info">
          <div className="info-item">
            <span className="info-label">Current {metal} price</span>
            <span className="info-value">
              ${metal === 'gold' ? goldPrice.toFixed(2) : silverPrice.toFixed(2)} / oz
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Price per {unit}</span>
            <span className="info-value">
              {selectedCurrency?.symbol}
              {((metal === 'gold' ? goldPrice : silverPrice) * WEIGHT_CONVERSIONS[unit] * CURRENCY_RATES[currency]).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
