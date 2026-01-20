import { Search, Upload, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories = ['All', 'Trending', 'Premium', '4K', 'New', 'Popular'];

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="fixed top-0 w-full bg-black/95 backdrop-blur-xl z-[1000] border-b border-[rgba(255,255,255,0.2)]">
      <div className="max-w-[1400px] mx-auto px-[5%] py-4 flex flex-col gap-4">
        {/* Top row */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="text-[clamp(1.4rem,3vw,2rem)] font-black flex items-center gap-1">
            <span className="neon-glow">🔥</span>
            <span className="gradient-text">EXCLUSIVE</span>
            <span className="gradient-text neon-glow">CONTENT</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-[400px] relative">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-full py-3 pl-12 pr-4 glass-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-coral transition-colors duration-300"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="outline" size="sm" className="gap-2 border-coral/50 hover:bg-coral/10 hover:border-coral">
              <Upload className="w-4 h-4" />
              Upload
            </Button>
            <Button variant="default" size="sm" className="gap-2 bg-gradient-to-r from-coral to-gold hover:opacity-90">
              <User className="w-4 h-4" />
              Sign In
            </Button>
          </div>
        </div>

        {/* Category tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                index === 0 
                  ? 'bg-gradient-to-r from-coral to-gold text-white' 
                  : 'bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
