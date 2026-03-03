import { useEffect, useRef } from 'react';

// Popunder ad - loads once globally
export const PopunderAd = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pl28808870.effectivegatecpm.com/de/0f/a9/de0fa980ec75afd5d9b0f4a8bb97e63e.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);
  return null;
};

// Social bar ad
export const SocialBarAd = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pl28837080.effectivegatecpm.com/e4/5f/36/e45f363ffa30236ea27155de3223e666.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);
  return null;
};

// Native banner (160x600 sidebar)
export const SideBannerAd = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const configScript = document.createElement('script');
    configScript.textContent = `
      atOptions = {
        'key' : 'f97be0fa8888185e6cabf7becaf67c23',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;
    containerRef.current.appendChild(configScript);

    const invokeScript = document.createElement('script');
    invokeScript.src = 'https://www.highperformanceformat.com/f97be0fa8888185e6cabf7becaf67c23/invoke.js';
    containerRef.current.appendChild(invokeScript);
  }, []);

  return <div ref={containerRef} className="flex justify-center my-4" />;
};

// Smartlink banner
export const SmartlinkBanner = () => {
  return (
    <div className="w-full py-3 bg-gradient-to-r from-coral/20 to-gold/20 border-y border-white/10 text-center relative z-10">
      <a 
        href="https://www.effectivegatecpm.com/rzq91edik?key=ebadcfe5ec98e8a0cf9337ceda45273d"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold text-foreground hover:text-coral transition-colors"
      >
        🔥 Exclusive Offers — Click Here for Premium Deals! 🔥
      </a>
    </div>
  );
};
