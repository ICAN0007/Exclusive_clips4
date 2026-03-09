import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, Calendar } from 'lucide-react';
import { Video, formatDuration } from '@/data/videos';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard = ({ video, onClick }: VideoCardProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes || 0);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatUploadDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  return (
    <div 
      onClick={onClick}
      className="relative rounded-xl sm:rounded-2xl overflow-hidden glass-card cursor-pointer transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 group hover:shadow-[0_0_30px_hsla(var(--coral)/0.5),0_20px_40px_rgba(0,0,0,0.5)] sm:hover:shadow-[0_0_40px_hsla(var(--coral)/0.6),0_30px_60px_rgba(0,0,0,0.6)] hover:border-coral active:scale-[0.98] sm:active:scale-100"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={video.thumb} 
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Duration badge */}
        <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-coral to-orange px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-primary-foreground shadow-lg">
          {formatDuration(video.duration)}
        </span>

        {/* Like button */}
        <button 
          onClick={handleLike}
          className={`absolute top-2 sm:top-3 left-2 sm:left-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isLiked 
              ? 'bg-coral text-primary-foreground scale-110' 
              : 'bg-background/50 text-foreground hover:bg-coral/80 hover:scale-110'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Info section */}
      <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
        <h3 className="text-xs sm:text-sm font-bold line-clamp-2 group-hover:text-coral transition-colors duration-300">
          {video.title}
        </h3>
        
        {/* Views and upload date */}
        <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-[10px] sm:text-xs">
          {video.views && (
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{video.views}</span>
            </div>
          )}
          {video.uploadDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatUploadDate(video.uploadDate)}</span>
            </div>
          )}
        </div>

        {/* Like count */}
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
          <Heart className="w-3 h-3" />
          <span>{likeCount.toLocaleString()} likes</span>
        </div>

        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/tag/${encodeURIComponent(tag)}`);
                }}
                className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium bg-muted text-muted-foreground hover:bg-coral/20 hover:text-coral transition-colors cursor-pointer"
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
