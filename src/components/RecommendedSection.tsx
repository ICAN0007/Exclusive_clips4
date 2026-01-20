import { Video, videos } from '@/data/videos';
import VideoCard from './VideoCard';
import { Sparkles } from 'lucide-react';

interface RecommendedSectionProps {
  onVideoClick: (id: string) => void;
}

const RecommendedSection = ({ onVideoClick }: RecommendedSectionProps) => {
  // Shuffle and pick recommended videos (simulating personalized recommendations)
  const recommendedVideos = [...videos].sort(() => Math.random() - 0.5);

  return (
    <section className="py-20 border-t border-border/30">
      <div className="mb-12 flex items-center gap-4">
        <Sparkles className="w-10 h-10 text-coral animate-pulse" />
        <h2 className="text-4xl md:text-5xl font-black gradient-text">
          RECOMMENDED FOR YOU
        </h2>
      </div>
      
      <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
        Handpicked selections based on what's popular and trending. Discover your next favorite content.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {recommendedVideos.map(video => (
          <div key={video.id} className="relative">
            {/* Recommended badge */}
            <div className="absolute -top-3 left-4 z-10 bg-gradient-to-r from-coral to-orange text-primary-foreground px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3 h-3" />
              Recommended
            </div>
            <VideoCard 
              video={video} 
              onClick={() => onVideoClick(video.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;
