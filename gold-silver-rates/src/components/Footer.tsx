import React from 'react';
import { Github, Twitter, Mail, TrendingUp } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <TrendingUp />
              </div>
              <div className="logo-text">
                <span className="logo-gold">Gold</span>
                <span className="logo-silver">Silver</span>
                <span className="logo-rates">Rates</span>
              </div>
            </div>
            <p className="footer-description">
              Track real-time gold and silver prices, view historical charts, 
              and make informed investment decisions with our comprehensive 
              precious metals platform.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <nav>
                <a href="#prices">Live Prices</a>
                <a href="#charts">Price Charts</a>
                <a href="#calculator">Calculator</a>
                <a href="#comparison">Ratio Analysis</a>
              </nav>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <nav>
                <a href="#faq">FAQ</a>
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
                <a href="#api">API Access</a>
              </nav>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <nav>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#disclaimer">Disclaimer</a>
                <a href="#cookies">Cookie Policy</a>
              </nav>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} GoldSilverRates. All rights reserved.
          </p>
          <p className="disclaimer">
            Prices are for informational purposes only. Not financial advice.
          </p>
          <div className="social-links">
            <a href="#twitter" aria-label="Follow us on Twitter">
              <Twitter />
            </a>
            <a href="#github" aria-label="View our GitHub">
              <Github />
            </a>
            <a href="#contact" aria-label="Contact us">
              <Mail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
