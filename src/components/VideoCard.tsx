import { Video, formatDuration } from '@/data/videos';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard = ({ video, onClick }: VideoCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="relative rounded-3xl overflow-hidden glass-card cursor-pointer transition-all duration-500 hover:-translate-y-6 hover:border-coral hover:shadow-[0_0_30px_hsla(0,85%,71%,0.5),0_25px_50px_rgba(0,0,0,0.5)] group"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-[200px]">
        <img 
          src={video.thumb} 
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Duration badge */}
        <span className="absolute top-4 right-4 bg-coral/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Overlay with info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-6 pt-12">
        <h3 className="text-lg font-bold line-clamp-2 mb-2">
          {video.title}
        </h3>
        <div className="text-muted-foreground text-sm">
          {video.views} views
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
