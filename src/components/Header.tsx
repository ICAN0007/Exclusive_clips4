import { useState } from 'react';
import { Search, Upload, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['All', 'Indian', 'Foreign', 'Trending', 'Premium', '4K', 'New', 'Popular'];

const Header = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }: HeaderProps) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-xl z-[1000] border-b border-border">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-[5%] py-2 sm:py-4 flex flex-col gap-2 sm:gap-4">
        {/* Top row */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Logo */}
          <div className="text-lg sm:text-[clamp(1.4rem,3vw,2rem)] font-black flex items-center gap-1 shrink-0">
            <span className="neon-glow">🔥</span>
            <span className="gradient-text neon-glow">Exclusiveclips4</span>
          </div>

          {/* Desktop Search */}
          <div className="hidden sm:block flex-1 max-w-[400px] relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full py-3 pl-12 pr-4 glass-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-coral transition-colors duration-300"
            />
          </div>

          {/* Mobile search icon + Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden rounded-full"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              {showMobileSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-2 border-coral/50 hover:bg-coral/10 hover:border-coral">
              <Upload className="w-4 h-4" />
              Upload
            </Button>
            <Button variant="default" size="sm" className="gap-1.5 sm:gap-2 bg-gradient-to-r from-coral to-gold hover:opacity-90 text-xs sm:text-sm px-3 sm:px-4">
              <User className="w-4 h-4" />
              <span className="hidden xs:inline">Sign In</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="sm:hidden relative animate-in slide-in-from-top-2 duration-200">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search videos..."
              autoFocus
              className="w-full py-2.5 pl-10 pr-4 glass-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-coral transition-colors duration-300"
            />
          </div>
        )}

        {/* Category tags - horizontally scrollable */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-gradient-to-r from-coral to-gold text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
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
