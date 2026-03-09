import { useState, useEffect } from 'react';
import { Video } from '@/data/videos';
import VideoCard from './VideoCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (id: string) => void;
  title?: string;
  perPage?: number;
}

const VideoGrid = ({ videos, onVideoClick, title, perPage = 18 }: VideoGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { setCurrentPage(1); }, [videos.length]);
  
  const totalPages = Math.ceil(videos.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentVideos = videos.slice(startIndex, startIndex + perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <section id="videos-section" className="py-8 sm:py-12 md:py-20">
      <div className="mb-4 sm:mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black gradient-text animate-kinetic inline-block">
          {title || '🔥 TRENDING NOW'}
        </h2>
        <span className="text-muted-foreground text-xs sm:text-sm shrink-0">
          {videos.length} videos • Page {currentPage}/{Math.max(totalPages, 1)}
        </span>
      </div>
      
      {/* 2 cols mobile, 2 tablet, 3 desktop, 4 xl */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {currentVideos.map(video => (
          <VideoCard 
            key={video.id} 
            video={video} 
            onClick={() => onVideoClick(video.id)}
          />
        ))}
      </div>
      
      {videos.length === 0 && (
        <div className="text-center py-12 sm:py-20">
          <p className="text-lg sm:text-2xl text-muted-foreground">No videos found.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-6 sm:mt-8 md:mt-12">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-xs sm:text-sm`}
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
                    className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-xs sm:text-sm`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default VideoGrid;
