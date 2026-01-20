import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Video, formatDuration, videos as allVideos } from '@/data/videos';
import VideoCard from './VideoCard';

interface VideoPlayerProps {
  video: Video;
  onBack: () => void;
  onVideoClick: (id: string) => void;
}

const VideoPlayer = ({ video, onBack, onVideoClick }: VideoPlayerProps) => {
  const relatedVideos = allVideos.filter(v => v.id !== video.id);

  return (
    <div className="fixed inset-0 bg-black z-[2000] overflow-y-auto">
      {/* Header bar with back button and logo */}
      <div className="fixed top-0 left-0 right-0 z-[2001] bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
          <Button variant="back" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          
          {/* Website name */}
          <div className="text-xl font-black flex items-center gap-1">
            <span className="neon-glow">🔥</span>
            <span className="gradient-text">EXCLUSIVE</span>
            <span className="gradient-text neon-glow">CONTENT</span>
          </div>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="pt-24 px-8 pb-20 max-w-[1400px] mx-auto">
        {/* Video Player */}
        <div className="relative w-full pb-[56.25%] mb-8">
          <iframe
            src={video.src}
            className="absolute top-0 left-0 w-full h-full rounded-3xl"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>

        {/* Video details */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-4">{video.title}</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
            <span>{formatDuration(video.duration)}</span>
            <span>•</span>
            <span>{video.views} views</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {video.tags.map(tag => (
              <span 
                key={tag} 
                className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related videos */}
        <div>
          <h3 className="text-2xl font-bold mb-8 gradient-text">🔥 MORE LIKE THIS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedVideos.map(v => (
              <VideoCard 
                key={v.id} 
                video={v} 
                onClick={() => onVideoClick(v.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
