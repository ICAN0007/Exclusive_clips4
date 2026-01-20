import { Video } from '@/data/videos';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (id: string) => void;
}

const VideoGrid = ({ videos, onVideoClick }: VideoGridProps) => {
  return (
    <section id="videos-section" className="py-20">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-black gradient-text animate-kinetic inline-block">
          🔥 TRENDING NOW
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {videos.map(video => (
          <VideoCard 
            key={video.id} 
            video={video} 
            onClick={() => onVideoClick(video.id)}
          />
        ))}
      </div>
      
      {videos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-muted-foreground">No videos found matching your search.</p>
        </div>
      )}
    </section>
  );
};

export default VideoGrid;
