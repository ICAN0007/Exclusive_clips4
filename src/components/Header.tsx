import { Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="fixed top-0 w-full bg-black/95 backdrop-blur-xl z-[1000] border-b border-[rgba(255,255,255,0.2)]">
      <div className="max-w-[1400px] mx-auto px-[5%] py-5 flex items-center gap-8">
        {/* Logo */}
        <div className="text-[clamp(1.8rem,4vw,2.5rem)] font-black flex items-center gap-1">
          <span className="neon-glow">🔥</span>
          <span className="gradient-text">EXCLUSIVE</span>
          <span className="gradient-text neon-glow">CONTENT</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-[500px] relative">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Discover premium content..."
              className="w-full py-4 pl-14 pr-6 glass-input text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-coral transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
