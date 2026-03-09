import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { useRef } from 'react';
import { Video, formatDuration } from '@/data/videos';
import { Button } from '@/components/ui/button';

interface TrendingSliderProps {
  videos: Video[];
  title: string;
  icon?: React.ReactNode;
  onVideoClick: (id: string) => void;
}

const TrendingSlider = ({ videos, title, icon, onVideoClick }: TrendingSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.7;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!videos.length) return null;

  return (
    <section className="py-4 sm:py-8">
      <div className="flex items-center justify-between mb-3 sm:mb-6">
        <h2 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl md:text-3xl font-black">
          {icon || <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-coral" />}
          <span className="gradient-text">{title}</span>
        </h2>
        <div className="hidden sm:flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('left')}
            className="rounded-full border-border hover:border-coral hover:bg-coral/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('right')}
            className="rounded-full border-border hover:border-coral hover:bg-coral/10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2 snap-x snap-mandatory"
      >
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoClick(video.id)}
            className="flex-shrink-0 w-[200px] sm:w-[280px] md:w-[320px] cursor-pointer group snap-start"
          >
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden glass-card transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_hsla(var(--coral)/0.5)]">
              <div className="relative aspect-video">
                <img 
                  src={video.thumb} 
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <span className="absolute top-2 right-2 bg-gradient-to-r from-coral to-orange px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
                  {formatDuration(video.duration)}
                </span>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-xs sm:text-sm font-bold line-clamp-2 text-foreground">
                    {video.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                    {video.views} views
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSlider;
