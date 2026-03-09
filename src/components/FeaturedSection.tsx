import { Play, Eye, Clock, Star } from 'lucide-react';
import { Video, formatDuration } from '@/data/videos';
import { Button } from '@/components/ui/button';

interface FeaturedSectionProps {
  video: Video;
  onVideoClick: (id: string) => void;
}

const FeaturedSection = ({ video, onVideoClick }: FeaturedSectionProps) => {
  return (
    <section className="relative py-4 sm:py-8 md:py-12">
      <div 
        onClick={() => onVideoClick(video.id)}
        className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group"
      >
        {/* Background image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[21/7]">
          <img 
            src={video.thumb} 
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-10">
          <div className="max-w-2xl space-y-2 sm:space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-coral text-primary-foreground text-[10px] sm:text-xs font-bold rounded-full animate-pulse">
                🔥 FEATURED
              </span>
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-muted/50 backdrop-blur-md text-[10px] sm:text-xs font-medium rounded-full">
                {formatDuration(video.duration)}
              </span>
            </div>
            
            <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black leading-tight line-clamp-2">
              {video.title}
            </h2>
            
            <div className="hidden sm:flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {video.views && (
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {video.views} views
                </span>
              )}
              {video.rating && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  {video.rating.toFixed(1)}
                </span>
              )}
              {video.uploadDate && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(video.uploadDate).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
              <Button 
                size="sm"
                className="gap-1.5 sm:gap-2 bg-gradient-to-r from-coral to-gold text-primary-foreground hover:opacity-90 rounded-full px-4 sm:px-8 text-xs sm:text-sm"
              >
                <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current" />
                Watch Now
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="rounded-full px-3 sm:px-6 border-border hover:bg-muted/50 text-xs sm:text-sm"
              >
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
