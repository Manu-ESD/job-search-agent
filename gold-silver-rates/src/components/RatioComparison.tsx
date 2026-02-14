import React from 'react';
import { Scale, TrendingUp, TrendingDown, Info } from 'lucide-react';
import './RatioComparison.css';

interface RatioComparisonProps {
  goldPrice: number;
  silverPrice: number;
}

const RatioComparison: React.FC<RatioComparisonProps> = ({ goldPrice, silverPrice }) => {
  const ratio = goldPrice / silverPrice;
  const historicalAverage = 60; // Historical average gold/silver ratio
  const isAboveAverage = ratio > historicalAverage;

  const getRatioAnalysis = () => {
    if (ratio > 80) {
      return {
        status: 'Silver Undervalued',
        description: 'Silver may be a better value relative to gold at current prices.',
        color: 'silver-favor',
      };
    } else if (ratio < 50) {
      return {
        status: 'Gold Undervalued',
        description: 'Gold may be a better value relative to silver at current prices.',
        color: 'gold-favor',
      };
    } else {
      return {
        status: 'Normal Range',
        description: 'The gold/silver ratio is within historical norms.',
        color: 'neutral',
      };
    }
  };

  const analysis = getRatioAnalysis();

  return (
    <section className="ratio-container" aria-label="Gold to Silver ratio comparison">
      <header className="ratio-header">
        <Scale className="ratio-icon" />
        <h3>Gold/Silver Ratio</h3>
      </header>

      <div className="ratio-display">
        <div className="ratio-number">
          <span className="ratio-value">{ratio.toFixed(2)}</span>
          <span className="ratio-label">:1</span>
        </div>
        <p className="ratio-explanation">
          1 oz of gold = {ratio.toFixed(2)} oz of silver
        </p>
      </div>

      <div className={`ratio-analysis ${analysis.color}`}>
        <div className="analysis-status">
          {isAboveAverage ? (
            <TrendingUp className="analysis-icon" />
          ) : (
            <TrendingDown className="analysis-icon" />
          )}
          <span>{analysis.status}</span>
        </div>
        <p className="analysis-description">{analysis.description}</p>
      </div>

      <div className="ratio-gauge">
        <div className="gauge-labels">
          <span>Gold Favored</span>
          <span>Silver Favored</span>
        </div>
        <div className="gauge-track">
          <div 
            className="gauge-fill"
            style={{ width: `${Math.min((ratio / 100) * 100, 100)}%` }}
          />
          <div 
            className="gauge-marker"
            style={{ left: `${(historicalAverage / 100) * 100}%` }}
          >
            <span className="marker-label">Avg: {historicalAverage}</span>
          </div>
        </div>
        <div className="gauge-scale">
          <span>30</span>
          <span>50</span>
          <span>70</span>
          <span>90</span>
        </div>
      </div>

      <div className="ratio-info">
        <Info className="info-icon" />
        <p>
          The gold/silver ratio measures how many ounces of silver it takes to buy one ounce of gold.
          Historically, this ratio has averaged around 60:1.
        </p>
      </div>

      <div className="comparison-table">
        <div className="comparison-row">
          <span className="comp-label">Current Gold Price</span>
          <span className="comp-value gold">${goldPrice.toFixed(2)}/oz</span>
        </div>
        <div className="comparison-row">
          <span className="comp-label">Current Silver Price</span>
          <span className="comp-value silver">${silverPrice.toFixed(2)}/oz</span>
        </div>
        <div className="comparison-row">
          <span className="comp-label">Historical Avg Ratio</span>
          <span className="comp-value">{historicalAverage}:1</span>
        </div>
        <div className="comparison-row">
          <span className="comp-label">Current vs Average</span>
          <span className={`comp-value ${isAboveAverage ? 'above' : 'below'}`}>
            {isAboveAverage ? '+' : ''}{((ratio - historicalAverage) / historicalAverage * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </section>
  );
};

export default RatioComparison;
