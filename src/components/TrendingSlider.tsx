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
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!videos.length) return null;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-black">
          {icon || <TrendingUp className="w-6 h-6 text-coral" />}
          <span className="gradient-text">{title}</span>
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('left')}
            className="rounded-full border-white/20 hover:border-coral hover:bg-coral/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('right')}
            className="rounded-full border-white/20 hover:border-coral hover:bg-coral/10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoClick(video.id)}
            className="flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer group"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative rounded-xl overflow-hidden glass-card transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_hsla(var(--coral)/0.5)]">
              <div className="relative" style={{ aspectRatio: '16 / 10' }}>
                <img 
                  src={video.thumb} 
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-2 right-2 bg-gradient-to-r from-coral to-orange px-2 py-0.5 rounded-full text-xs font-bold">
                  {formatDuration(video.duration)}
                </span>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-sm font-bold line-clamp-2 text-foreground">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
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
