import React from 'react';
import { Sun, Moon, Menu, X, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="site-header">
      <div className="header-container">
        <a href="/" className="logo" aria-label="GoldSilver Rates Home">
          <div className="logo-icon">
            <TrendingUp />
          </div>
          <div className="logo-text">
            <span className="logo-gold">Gold</span>
            <span className="logo-silver">Silver</span>
            <span className="logo-rates">Rates</span>
          </div>
        </a>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <a href="#prices" className="nav-link">Live Prices</a>
          <a href="#charts" className="nav-link">Charts</a>
          <a href="#calculator" className="nav-link">Calculator</a>
          <a href="#comparison" className="nav-link">Comparison</a>
          <a href="#news" className="nav-link">News</a>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
