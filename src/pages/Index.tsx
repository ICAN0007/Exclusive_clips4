import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ParticleCanvas from '@/components/ParticleCanvas';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import VideoGrid from '@/components/VideoGrid';
import VideoPlayer from '@/components/VideoPlayer';
import Footer from '@/components/Footer';
import { videos, Video } from '@/data/videos';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: videosFromJson } = useQuery({
    queryKey: ['videos-json'],
    queryFn: async (): Promise<Video[]> => {
      const res = await fetch('/videos.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`Failed to load videos.json: ${res.status}`);
      const json = await res.json();
      if (Array.isArray(json)) return json as Video[];
      return (json?.videos ?? []) as Video[];
    },
    staleTime: Infinity,
    retry: 1,
  });

  const allVideos = videosFromJson?.length ? videosFromJson : videos;

  const filteredVideos = useMemo(() => {
    let result = allVideos;
    
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
  }, [searchQuery, selectedCategory, allVideos]);

  const handleScrollToVideos = () => {
    document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVideoClick = (id: string) => {
    const video = allVideos.find(v => v.id === id);
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
          allVideos={allVideos}
          onBack={handleBack}
          onVideoClick={handleVideoClick}
        />
      )}
    </>
  );
};

export default Index;
