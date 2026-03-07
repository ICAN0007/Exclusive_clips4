import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md relative z-10">
      {/* Footer banner ad */}
      <div className="w-full py-3 bg-gradient-to-r from-primary/10 to-secondary/10 text-center">
        <a
          href="https://www.effectivegatecpm.com/rzq91edik?key=ebadcfe5ec98e8a0cf9337ceda45273d"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-foreground hover:text-primary transition-colors"
        >
          ⚡ Exclusive Premium Deals — Limited Time Offer ⚡
        </a>
      </div>
      <div className="py-6 px-[5%] flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
        <span>© 2026 Exclusiveclips4 — Built with React</span>
        <div className="flex gap-4">
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
