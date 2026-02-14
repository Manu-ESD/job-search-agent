# 🥇 GoldSilverRates - Live Precious Metal Prices

A modern, responsive web application for tracking real-time gold and silver prices with historical charts, calculators, and investment tools.

![GoldSilverRates](https://img.shields.io/badge/Gold-Silver-yellow)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange)

## ✨ Features

### 📊 Real-Time Price Display
- Live gold and silver prices with auto-refresh every 30 seconds
- 24-hour high/low tracking
- Price change indicators with percentage
- Support for multiple currencies (USD, EUR, GBP, INR, etc.)

### 📈 Interactive Historical Charts
- Price history charts using Chart.js
- Multiple time ranges: 1D, 1W, 1M, 3M, 6M, 1Y, 5Y, ALL
- High, low, and average statistics
- Gradient-filled area charts

### 🧮 Value Calculator
- Calculate gold/silver values in any weight unit
- Support for Troy Ounce, Gram, Kilogram, Tola, Tael
- Multi-currency conversion
- Real-time calculation updates

### ⚖️ Gold/Silver Ratio Analysis
- Current ratio calculation
- Historical average comparison
- Visual gauge indicator
- Investment insights

### 🌙 Dark Mode
- System preference detection
- Manual toggle option
- Smooth theme transitions

### 📱 Fully Responsive
- Mobile-first design
- Tablet and desktop optimized
- Touch-friendly controls

### 🔍 SEO Optimized
- Meta tags for social sharing
- Open Graph and Twitter Cards
- Structured data (JSON-LD)
- Sitemap and robots.txt

### 💰 Ad Integration Ready
- Google AdSense placeholders
- Strategic ad placement
- Non-intrusive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase CLI (for deployment)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gold-silver-rates

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🔥 Firebase Deployment

### First-time Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase (if not already done):
```bash
firebase init hosting
```

### Deploy

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

Your site will be available at `https://goldsilverrates.web.app`

## 📁 Project Structure

```
gold-silver-rates/
├── public/
│   ├── index.html        # SEO-optimized HTML template
│   ├── robots.txt        # Search engine crawling rules
│   ├── sitemap.xml       # Site structure for SEO
│   └── manifest.json     # PWA manifest
├── src/
│   ├── components/
│   │   ├── Header.tsx    # Navigation header with dark mode toggle
│   │   ├── Footer.tsx    # Site footer with links
│   │   ├── PriceCard.tsx # Metal price display card
│   │   ├── PriceChart.tsx# Historical price chart
│   │   ├── Calculator.tsx# Value calculator tool
│   │   ├── RatioComparison.tsx # Gold/Silver ratio
│   │   └── AdBanner.tsx  # Advertisement placeholder
│   ├── context/
│   │   └── ThemeContext.tsx # Dark mode context
│   ├── services/
│   │   └── api.ts        # Price fetching and calculations
│   ├── types/
│   │   └── index.ts      # TypeScript interfaces
│   ├── App.tsx           # Main application component
│   ├── App.css           # Application styles
│   └── index.css         # Global styles and CSS variables
├── firebase.json         # Firebase hosting configuration
├── .firebaserc           # Firebase project configuration
└── package.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for production API keys:

```env
REACT_APP_GOLD_API_KEY=your_api_key_here
```

### API Integration

The app currently uses simulated data for demo purposes. To integrate real-time data:

1. Sign up for an API key at [GoldAPI.io](https://www.goldapi.io/) or [MetalpriceAPI](https://metalpriceapi.com/)

2. Update `src/services/api.ts` to use the real API:

```typescript
const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
  headers: { 'x-access-token': process.env.REACT_APP_GOLD_API_KEY }
});
```

### Google AdSense

To enable ads:

1. Get your AdSense publisher ID from [Google AdSense](https://www.google.com/adsense/)

2. Uncomment and update the AdSense script in `public/index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

3. Update `AdBanner.tsx` with your ad slot IDs

## 🎨 Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #3b82f6;
  --gold-color: #FFD700;
  --silver-color: #C0C0C0;
  /* ... more variables */
}
```

### Adding New Currencies

Update `CURRENCIES` and `CURRENCY_RATES` in `src/services/api.ts`:

```typescript
export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  // Add more currencies here
];
```

## 📊 SEO Features

- **Meta Tags**: Title, description, keywords, Open Graph, Twitter Cards
- **Structured Data**: Website schema, FAQ schema
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine crawling directives
- **Semantic HTML**: Proper heading structure, ARIA labels
- **Performance**: Optimized images, code splitting

## 🛡️ Security Headers

Firebase hosting is configured with security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 📱 PWA Support

The app includes PWA capabilities through the manifest.json. To fully enable:

1. Add service worker registration in `index.tsx`
2. Configure caching strategies
3. Add offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [Lucide Icons](https://lucide.dev/) for icons
- [Firebase](https://firebase.google.com/) for hosting
- Free metal price APIs for data

---

Built with ❤️ using React and TypeScript
