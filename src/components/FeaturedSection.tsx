import { Play, Eye, Clock, Star } from 'lucide-react';
import { Video, formatDuration } from '@/data/videos';
import { Button } from '@/components/ui/button';

interface FeaturedSectionProps {
  video: Video;
  onVideoClick: (id: string) => void;
}

const FeaturedSection = ({ video, onVideoClick }: FeaturedSectionProps) => {
  return (
    <section className="relative py-8 md:py-12">
      <div 
        onClick={() => onVideoClick(video.id)}
        className="relative rounded-3xl overflow-hidden cursor-pointer group"
      >
        {/* Background image with overlay */}
        <div className="relative aspect-[21/9] md:aspect-[21/7]">
          <img 
            src={video.thumb} 
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-coral text-primary-foreground text-xs font-bold rounded-full animate-pulse">
                🔥 FEATURED
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-xs font-medium rounded-full">
                {formatDuration(video.duration)}
              </span>
            </div>
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight">
              {video.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

            <div className="flex gap-3 pt-2">
              <Button 
                size="lg"
                className="gap-2 bg-gradient-to-r from-coral to-gold text-primary-foreground hover:opacity-90 rounded-full px-8"
              >
                <Play className="w-5 h-5 fill-current" />
                Watch Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="rounded-full px-6 border-white/20 hover:bg-white/10"
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
