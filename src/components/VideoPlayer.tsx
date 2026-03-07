import { useState, useMemo, useEffect } from 'react';
import { useViewTracker } from '@/hooks/useViewTracker';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Video, formatDuration } from '@/data/videos';
import VideoCard from './VideoCard';
import LikeShareBar from './LikeShareBar';
import CommentsSection from './CommentsSection';
import InContentAd from './InContentAd';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface VideoPlayerProps {
  video: Video;
  allVideos: Video[];
  onBack: () => void;
  onVideoClick: (id: string) => void;
}

const RELATED_PER_PAGE = 8;

const VideoPlayer = ({ video, allVideos, onBack, onVideoClick }: VideoPlayerProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Get recommended videos matching current video's tags, then fill with others
  const recommendedVideos = useMemo(() => {
    const currentTags = new Set([
      ...(video.tags || []).map(t => t.toLowerCase()),
      ...(video.categories || []).map(c => c.toLowerCase()),
    ]);

    const others = allVideos.filter(v => v.id !== video.id);

    // Score by number of matching tags
    const scored = others.map(v => {
      const vTags = [
        ...(v.tags || []).map(t => t.toLowerCase()),
        ...(v.categories || []).map(c => c.toLowerCase()),
      ];
      const score = vTags.filter(t => currentTags.has(t)).length;
      return { video: v, score };
    });

    // Sort by score descending, then by views
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const viewsA = parseInt(String(a.video.views).replace(/[^0-9]/g, '')) || 0;
      const viewsB = parseInt(String(b.video.views).replace(/[^0-9]/g, '')) || 0;
      return viewsB - viewsA;
    });

    return scored.map(s => s.video);
  }, [video, allVideos]);

  const totalPages = Math.ceil(recommendedVideos.length / RELATED_PER_PAGE);
  const startIdx = (currentPage - 1) * RELATED_PER_PAGE;
  const currentVideos = recommendedVideos.slice(startIdx, startIdx + RELATED_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('related-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset page when video changes
  useMemo(() => setCurrentPage(1), [video.id]);

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('ellipsis');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="fixed inset-0 bg-black z-[2000] overflow-y-auto">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-[2001] bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
          <Button variant="back" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <div className="text-xl font-black flex items-center gap-1">
            <span className="neon-glow">🔥</span>
            <span className="gradient-text neon-glow">Exclusiveclips4</span>
          </div>
          <div className="w-20" />
        </div>
      </div>

      <div className="pt-24 px-8 pb-20 max-w-[1400px] mx-auto">
        {/* Video Player */}
        <div className="relative w-full pb-[56.25%] mb-8">
          <iframe
            src={video.src}
            className="absolute top-0 left-0 w-full h-full rounded-none"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>

        {/* Video details */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-4">{video.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
            <span>{formatDuration(video.duration)}</span>
            <span>•</span>
            <span>{video.views} views</span>
          </div>
          <LikeShareBar title={video.title} />
          <div className="flex flex-wrap gap-3 mt-4">
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

        {/* In-content ad */}
        <InContentAd />

        {/* Comments */}
        <CommentsSection />

        {/* Recommended videos */}
        <div id="related-section">
          <h3 className="text-2xl font-bold mb-2 gradient-text">🔥 RECOMMENDED FOR YOU</h3>
          <p className="text-muted-foreground text-sm mb-6">
            {recommendedVideos.length} videos • Page {currentPage} of {totalPages}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentVideos.map(v => (
              <VideoCard 
                key={v.id} 
                video={v} 
                onClick={() => onVideoClick(v.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
