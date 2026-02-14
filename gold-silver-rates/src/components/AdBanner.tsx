import React, { useEffect } from 'react';
import './AdBanner.css';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

// Placeholder component for Google AdSense
// In production, replace with actual AdSense code
const AdBanner: React.FC<AdBannerProps> = ({ slot, format = 'auto', className = '' }) => {
  useEffect(() => {
    // In production, push ads when component mounts
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className={`ad-banner ${format} ${className}`} aria-label="Advertisement">
      <div className="ad-placeholder">
        <span className="ad-label">Advertisement</span>
        <div className="ad-content">
          {/* 
            In production, replace with actual AdSense code:
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot={slot}
              data-ad-format={format}
              data-full-width-responsive="true"
            />
          */}
          <div className="ad-demo">
            <span>Your Ad Here</span>
            <small>Google AdSense - Slot: {slot}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
