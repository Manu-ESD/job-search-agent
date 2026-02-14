import React, { useEffect, useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import PriceCard from './components/PriceCard';
import PriceChart from './components/PriceChart';
import Calculator from './components/Calculator';
import RatioComparison from './components/RatioComparison';
import AdBanner from './components/AdBanner';
import { MetalPrice } from './types';
import { fetchCurrentPrices } from './services/api';
import { RefreshCw, Bell, Newspaper, Clock } from 'lucide-react';
import './App.css';

const App: React.FC = () => {
  const [prices, setPrices] = useState<{ gold: MetalPrice; silver: MetalPrice } | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadPrices = useCallback(async () => {
    try {
      const data = await fetchCurrentPrices();
      setPrices(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPrices();
  }, [loadPrices]);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      loadPrices();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, loadPrices]);

  const handleRefresh = () => {
    setLoading(true);
    loadPrices();
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        
        <main className="main-content">
          {/* Hero Section */}
          <section className="hero-section" id="prices">
            <div className="container">
              <div className="hero-content">
                <h1>Real-Time <span className="gold-text">Gold</span> & <span className="silver-text">Silver</span> Prices</h1>
                <p className="hero-subtitle">
                  Track live precious metal prices, view historical charts, and make informed investment decisions.
                </p>
              </div>

              <div className="update-controls">
                <div className="last-update">
                  <Clock size={16} />
                  <span>
                    {lastUpdate ? `Updated: ${lastUpdate.toLocaleTimeString()}` : 'Loading...'}
                  </span>
                </div>
                <div className="control-buttons">
                  <button 
                    className={`auto-refresh-btn ${autoRefresh ? 'active' : ''}`}
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    aria-pressed={autoRefresh}
                  >
                    Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}
                  </button>
                  <button 
                    className="refresh-btn" 
                    onClick={handleRefresh}
                    disabled={loading}
                    aria-label="Refresh prices"
                  >
                    <RefreshCw className={loading ? 'spinning' : ''} size={18} />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Price Cards */}
              <div className="price-cards-grid">
                {loading && !prices ? (
                  <>
                    <div className="price-card-skeleton" />
                    <div className="price-card-skeleton" />
                  </>
                ) : prices ? (
                  <>
                    <PriceCard price={prices.gold} />
                    <PriceCard price={prices.silver} />
                  </>
                ) : null}
              </div>
            </div>
          </section>

          {/* Ad Banner - Top */}
          <div className="container">
            <AdBanner slot="top-banner" format="horizontal" />
          </div>

          {/* Charts Section */}
          <section className="charts-section" id="charts">
            <div className="container">
              <h2 className="section-title">📈 Price History</h2>
              <p className="section-description">
                Analyze historical price trends with interactive charts. Select different time ranges to view performance.
              </p>
              
              <div className="charts-grid">
                <PriceChart metal="gold" />
                <PriceChart metal="silver" />
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="tools-section" id="calculator">
            <div className="container">
              <h2 className="section-title">🛠️ Useful Tools</h2>
              <p className="section-description">
                Calculate values, compare ratios, and analyze your precious metals investments.
              </p>

              <div className="tools-grid">
                {prices && (
                  <>
                    <Calculator 
                      goldPrice={prices.gold.price} 
                      silverPrice={prices.silver.price} 
                    />
                    <RatioComparison 
                      goldPrice={prices.gold.price} 
                      silverPrice={prices.silver.price} 
                    />
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Ad Banner - Middle */}
          <div className="container">
            <AdBanner slot="middle-banner" format="rectangle" />
          </div>

          {/* Market Insights Section */}
          <section className="insights-section" id="news">
            <div className="container">
              <h2 className="section-title">
                <Newspaper size={24} />
                Market Insights
              </h2>
              <p className="section-description">
                Stay informed with the latest precious metals market news and analysis.
              </p>

              <div className="insights-grid">
                <article className="insight-card">
                  <div className="insight-icon gold">🥇</div>
                  <h3>Gold Market Overview</h3>
                  <p>
                    Gold continues to be a preferred safe-haven asset during times of economic uncertainty.
                    Central banks worldwide are increasing their gold reserves.
                  </p>
                  <span className="insight-time">Updated 2 hours ago</span>
                </article>

                <article className="insight-card">
                  <div className="insight-icon silver">🥈</div>
                  <h3>Silver Industrial Demand</h3>
                  <p>
                    Silver demand is rising due to its critical role in solar panel manufacturing
                    and other green energy technologies.
                  </p>
                  <span className="insight-time">Updated 4 hours ago</span>
                </article>

                <article className="insight-card">
                  <div className="insight-icon market">📊</div>
                  <h3>Market Analysis</h3>
                  <p>
                    Technical indicators suggest a potential breakout in precious metals prices.
                    Watch key support and resistance levels.
                  </p>
                  <span className="insight-time">Updated 1 hour ago</span>
                </article>
              </div>
            </div>
          </section>

          {/* Price Alert CTA */}
          <section className="cta-section" id="comparison">
            <div className="container">
              <div className="cta-card">
                <div className="cta-icon">
                  <Bell size={32} />
                </div>
                <div className="cta-content">
                  <h2>Never Miss a Price Movement</h2>
                  <p>
                    Set up personalized price alerts and get notified when gold or silver 
                    reaches your target price. Stay ahead of the market.
                  </p>
                  <button className="cta-button">
                    Coming Soon - Price Alerts
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section for SEO */}
          <section className="faq-section" id="faq">
            <div className="container">
              <h2 className="section-title">❓ Frequently Asked Questions</h2>
              
              <div className="faq-grid">
                <details className="faq-item">
                  <summary>What is the current gold price?</summary>
                  <p>
                    The current gold price is displayed in real-time at the top of this page. 
                    Prices are updated every 30 seconds and shown in USD per troy ounce.
                  </p>
                </details>

                <details className="faq-item">
                  <summary>How is the gold/silver ratio calculated?</summary>
                  <p>
                    The gold/silver ratio is calculated by dividing the price of gold by the price of silver. 
                    It indicates how many ounces of silver are needed to purchase one ounce of gold.
                  </p>
                </details>

                <details className="faq-item">
                  <summary>What factors affect gold and silver prices?</summary>
                  <p>
                    Precious metal prices are influenced by inflation, currency fluctuations, 
                    geopolitical events, central bank policies, and supply/demand dynamics.
                  </p>
                </details>

                <details className="faq-item">
                  <summary>Is gold a good investment?</summary>
                  <p>
                    Gold is traditionally considered a safe-haven asset and hedge against inflation. 
                    However, investment decisions should be based on individual financial goals and risk tolerance.
                  </p>
                </details>
              </div>
            </div>
          </section>

          {/* Ad Banner - Bottom */}
          <div className="container">
            <AdBanner slot="bottom-banner" format="horizontal" />
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
