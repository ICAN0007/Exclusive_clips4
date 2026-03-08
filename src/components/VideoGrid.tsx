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

  // Reset to page 1 when videos change
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
    if (totalPages <= 7) {
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
    <section id="videos-section" className="py-12 md:py-20">
      <div className="mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black gradient-text animate-kinetic inline-block">
          {title || '🔥 TRENDING NOW'}
        </h2>
        <span className="text-muted-foreground text-sm shrink-0">
          {videos.length} videos • Page {currentPage} of {Math.max(totalPages, 1)}
        </span>
      </div>
      
      {/* 1 column mobile, 2 tablet, 3 desktop with increased gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {currentVideos.map(video => (
          <VideoCard 
            key={video.id} 
            video={video} 
            onClick={() => onVideoClick(video.id)}
          />
        ))}
      </div>
      
      {videos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-muted-foreground">No videos found.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-8 md:mt-12">
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
    </section>
  );
};

export default VideoGrid;
