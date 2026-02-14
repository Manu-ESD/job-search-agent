import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HistoricalPrice, TimeRange } from '../types';
import { fetchHistoricalPrices } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import './PriceChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  metal: 'gold' | 'silver';
}

const TIME_RANGES: TimeRange[] = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', 'ALL'];

const PriceChart: React.FC<PriceChartProps> = ({ metal }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [data, setData] = useState<HistoricalPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const historicalData = await fetchHistoricalPrices(metal, timeRange);
        setData(historicalData);
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [metal, timeRange]);

  const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    if (metal === 'gold') {
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0.0)');
    } else {
      gradient.addColorStop(0, 'rgba(192, 192, 192, 0.4)');
      gradient.addColorStop(1, 'rgba(192, 192, 192, 0.0)');
    }
    return gradient;
  };

  const chartData = {
    labels: data.map(d => {
      const date = new Date(d.date);
      if (timeRange === '1D') {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      }
      if (timeRange === '1W' || timeRange === '1M') {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }),
    datasets: [
      {
        label: `${metal.toUpperCase()} Price (USD)`,
        data: data.map(d => d.price),
        borderColor: metal === 'gold' ? '#FFD700' : '#C0C0C0',
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          return getGradient(ctx, chartArea);
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: timeRange === '1D' || timeRange === '1W' ? 2 : 0,
        pointHoverRadius: 6,
        pointBackgroundColor: metal === 'gold' ? '#FFD700' : '#C0C0C0',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#1f2937',
        bodyColor: isDark ? '#d1d5db' : '#4b5563',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            return `$${context.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          color: isDark ? '#374151' : '#f3f4f6',
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          callback: (value: any) => '$' + value.toLocaleString(),
        },
      },
    },
  };

  const priceChange = data.length >= 2 ? data[data.length - 1].price - data[0].price : 0;
  const priceChangePercent = data.length >= 2 ? (priceChange / data[0].price) * 100 : 0;

  return (
    <section className="price-chart-container" aria-label={`${metal} price chart`}>
      <header className="chart-header">
        <div className="chart-title">
          <h3>{metal === 'gold' ? '🥇' : '🥈'} {metal.toUpperCase()} Price History</h3>
          {data.length > 0 && (
            <div className={`chart-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
              <span>{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} USD</span>
              <span>({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)</span>
            </div>
          )}
        </div>
        <nav className="time-range-selector" aria-label="Time range selection">
          {TIME_RANGES.map((range) => (
            <button
              key={range}
              className={`range-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => setTimeRange(range)}
              aria-pressed={timeRange === range}
            >
              {range}
            </button>
          ))}
        </nav>
      </header>

      <div className="chart-wrapper">
        {loading ? (
          <div className="chart-loading">
            <div className="loading-spinner"></div>
            <span>Loading chart data...</span>
          </div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>

      {data.length > 0 && (
        <footer className="chart-stats">
          <div className="stat-item">
            <span className="stat-label">High</span>
            <span className="stat-value high">
              ${Math.max(...data.map(d => d.high || d.price)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Low</span>
            <span className="stat-value low">
              ${Math.min(...data.map(d => d.low || d.price)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average</span>
            <span className="stat-value">
              ${(data.reduce((acc, d) => acc + d.price, 0) / data.length).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </footer>
      )}
    </section>
  );
};

export default PriceChart;
