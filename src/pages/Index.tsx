import { useState, useMemo } from 'react';
import ParticleCanvas from '@/components/ParticleCanvas';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import VideoGrid from '@/components/VideoGrid';
import VideoPlayer from '@/components/VideoPlayer';
import { videos, Video } from '@/data/videos';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = useMemo(() => {
    let result = videos;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(video => 
        video.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [searchQuery, selectedCategory]);

  const handleScrollToVideos = () => {
    document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVideoClick = (id: string) => {
    const video = videos.find(v => v.id === id);
    if (video) {
      setSelectedVideo(video);
    }
  };

  const handleBack = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <ParticleCanvas />
      
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-[1400px] mx-auto px-[5%] pb-24 relative z-10">
        <HeroSection onScrollToVideos={handleScrollToVideos} />
        <VideoGrid 
          videos={filteredVideos} 
          onVideoClick={handleVideoClick}
        />
      </main>

      {selectedVideo && (
        <VideoPlayer 
          video={selectedVideo}
          onBack={handleBack}
          onVideoClick={handleVideoClick}
        />
      )}
    </>
  );
};

export default Index;
