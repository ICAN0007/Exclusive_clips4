import { useState } from 'react';
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
}

const VIDEOS_PER_PAGE = 12;

const VideoGrid = ({ videos, onVideoClick }: VideoGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const endIndex = startIndex + VIDEOS_PER_PAGE;
  const currentVideos = videos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <section id="videos-section" className="py-20">
      <div className="mb-12 flex justify-between items-center">
        <h2 className="text-4xl md:text-5xl font-black gradient-text animate-kinetic inline-block">
          🔥 TRENDING NOW
        </h2>
        <span className="text-muted-foreground text-sm">
          {videos.length} videos • Page {currentPage} of {totalPages}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <p className="text-2xl text-muted-foreground">No videos found matching your search.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-12">
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
