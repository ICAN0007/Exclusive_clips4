import { useState, useEffect } from 'react';

const AgeVerification = () => {
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    const isVerified = localStorage.getItem('age-verified');
    if (!isVerified) {
      setVerified(false);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('age-verified', 'true');
    setVerified(true);
    document.body.style.overflow = '';
  };

  if (verified) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-xl">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-4xl font-black text-foreground mb-4">Age Verification</h1>
        <p className="text-muted-foreground mb-8 text-base">
          You must be 21 or older to visit this website. Your age will be verified at checkout.
        </p>
        <button
          onClick={handleVerify}
          className="px-8 py-3 rounded-lg font-bold text-foreground bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 transition-all duration-300 border border-white/20 text-lg"
        >
          I'm 21 or older &rsaquo;
        </button>
        <br />
        <a 
          href="https://agechecker.net/age-verification-explained" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 text-muted-foreground text-sm hover:text-foreground transition-colors underline inline-block"
        >
          Age Verification FAQ
        </a>
      </div>
    </div>
  );
};

export default AgeVerification;
