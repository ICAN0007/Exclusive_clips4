import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Clock, TrendingUp, Eye, X } from 'lucide-react';
import { Video } from '@/data/videos';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  videos: Video[];
  onVideoClick: (id: string) => void;
  durationFilter: string;
  onDurationChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SearchFilters = ({
  searchQuery,
  onSearchChange,
  videos,
  onVideoClick,
  durationFilter,
  onDurationChange,
  sortBy,
  onSortChange,
}: SearchFiltersProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Get search suggestions
  const suggestions = searchQuery.trim()
    ? videos
        .filter(v => 
          v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      {/* Search with suggestions */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search videos..."
          className="w-full py-3 pl-11 pr-10 glass-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-coral transition-colors duration-300"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl"
          >
            {suggestions.map((video) => (
              <button
                key={video.id}
                onClick={() => {
                  onVideoClick(video.id);
                  setShowSuggestions(false);
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-white/10 transition-colors text-left"
              >
                <img 
                  src={video.thumb} 
                  alt={video.title}
                  className="w-16 h-10 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{video.title}</p>
                  <p className="text-xs text-muted-foreground">{video.views} views</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Duration filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 border-white/20 hover:border-coral">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Duration</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card/95 backdrop-blur-xl border-white/10">
          <DropdownMenuLabel>Filter by Duration</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={durationFilter} onValueChange={onDurationChange}>
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="short">Short (&lt; 10 min)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">Medium (10-20 min)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="long">Long (&gt; 20 min)</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort by */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 border-white/20 hover:border-coral">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Sort</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card/95 backdrop-blur-xl border-white/10">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
            <DropdownMenuRadioItem value="trending">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="views">
              <Eye className="w-4 h-4 mr-2" />
              Most Viewed
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="newest">
              <Clock className="w-4 h-4 mr-2" />
              Newest
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchFilters;
