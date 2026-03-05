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
      <div className="relative overflow-hidden" style={{ aspectRatio: '510 / 290' }}>
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

      {/* Info section */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-bold line-clamp-2">
          {video.title}
        </h3>
        {video.views && (
          <div className="text-muted-foreground text-xs">
            {video.views} views
          </div>
        )}
        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {video.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
