import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetalPrice } from '../types';
import './PriceCard.css';

interface PriceCardProps {
  price: MetalPrice;
  onClick?: () => void;
}

const PriceCard: React.FC<PriceCardProps> = ({ price, onClick }) => {
  const isPositive = price.change > 0;
  const isNegative = price.change < 0;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getTrendIcon = () => {
    if (isPositive) return <TrendingUp className="trend-icon up" />;
    if (isNegative) return <TrendingDown className="trend-icon down" />;
    return <Minus className="trend-icon neutral" />;
  };

  return (
    <article 
      className={`price-card ${price.metal}`} 
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${price.metal} price: ${formatPrice(price.price)}`}
    >
      <div className="price-card-header">
        <div className="metal-icon">
          {price.metal === 'gold' ? '🥇' : '🥈'}
        </div>
        <div className="metal-info">
          <h2 className="metal-name">{price.metal.toUpperCase()}</h2>
          <span className="metal-symbol">{price.metal === 'gold' ? 'XAU' : 'XAG'}</span>
        </div>
      </div>

      <div className="price-main">
        <span className="current-price">{formatPrice(price.price)}</span>
        <span className="price-unit">per {price.unit}</span>
      </div>

      <div className={`price-change ${isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'}`}>
        {getTrendIcon()}
        <span className="change-value">
          {isPositive ? '+' : ''}{formatPrice(price.change)}
        </span>
        <span className="change-percent">
          ({isPositive ? '+' : ''}{price.changePercent.toFixed(2)}%)
        </span>
      </div>

      <div className="price-range">
        <div className="range-item">
          <span className="range-label">24h High</span>
          <span className="range-value high">{formatPrice(price.high24h)}</span>
        </div>
        <div className="range-item">
          <span className="range-label">24h Low</span>
          <span className="range-value low">{formatPrice(price.low24h)}</span>
        </div>
      </div>

      <div className="price-timestamp">
        Updated: {price.timestamp.toLocaleTimeString()}
      </div>
    </article>
  );
};

export default PriceCard;
