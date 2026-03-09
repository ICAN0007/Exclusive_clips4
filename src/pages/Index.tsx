import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Flame, Eye, Clock, Star } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import TrendingSlider from '@/components/TrendingSlider';
import VideoGrid from '@/components/VideoGrid';
import VideoPlayer from '@/components/VideoPlayer';
import Footer from '@/components/Footer';
import { SideBannerAd } from '@/components/AdScripts';
import { videos, Video } from '@/data/videos';
import { 
  sortByTrending, 
  sortByMostViewed, 
  sortByNewest, 
  sortByTopRated 
} from '@/lib/videoSorting';

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

  // Sorted video lists for different sections
  const trendingVideos = useMemo(() => sortByTrending(allVideos).slice(0, 10), [allVideos]);
  const mostViewedVideos = useMemo(() => sortByMostViewed(allVideos).slice(0, 10), [allVideos]);
  const newReleases = useMemo(() => sortByNewest(allVideos).slice(0, 10), [allVideos]);
  const topRatedVideos = useMemo(() => sortByTopRated(allVideos).slice(0, 10), [allVideos]);
  const featuredVideo = trendingVideos[0];

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allVideos.forEach(v => {
      v.tags?.forEach(t => tagSet.add(t));
      v.categories?.forEach(c => tagSet.add(c));
    });
    return Array.from(tagSet).sort();
  }, [allVideos]);

  const filteredVideos = useMemo(() => {
    let result = allVideos;
    if (selectedCategory !== 'All') {
      result = result.filter(video => 
        video.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()) ||
        video.categories?.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
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

  const handleTagClick = (tag: string) => {
    setSelectedCategory(tag);
    setSearchQuery('');
    document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVideoClick = (id: string) => {
    const video = allVideos.find(v => v.id === id);
    if (video) setSelectedVideo(video);
  };

  const handleBack = () => setSelectedVideo(null);

  return (
    <>
      <ParticleCanvas />
      
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-[1400px] mx-auto px-3 sm:px-[5%] pb-12 sm:px-[5%] pb-12 sm:px-[5%] pb-12 sm:pb-24 relative z-10">
        <HeroSection onScrollToVideos={handleScrollToVideos} />
        
        {/* Featured Hero Video */}
        {featuredVideo && (
          <FeaturedSection 
            video={featuredVideo} 
            onVideoClick={handleVideoClick} 
          />
        )}

        {/* Trending Today Slider */}
        <TrendingSlider 
          videos={trendingVideos}
          title="Trending Today"
          icon={<Flame className="w-6 h-6 text-coral" />}
          onVideoClick={handleVideoClick}
        />

        {/* Most Viewed This Week */}
        <TrendingSlider 
          videos={mostViewedVideos}
          title="Most Viewed This Week"
          icon={<Eye className="w-6 h-6 text-coral" />}
          onVideoClick={handleVideoClick}
        />

        {/* New Releases */}
        <TrendingSlider 
          videos={newReleases}
          title="New Releases"
          icon={<Clock className="w-6 h-6 text-coral" />}
          onVideoClick={handleVideoClick}
        />

        {/* Top Rated */}
        <TrendingSlider 
          videos={topRatedVideos}
          title="Top Rated"
          icon={<Star className="w-6 h-6 text-gold" />}
          onVideoClick={handleVideoClick}
        />
        
        <div className="flex gap-6">
          <div className="flex-1">
            <VideoGrid videos={filteredVideos} onVideoClick={handleVideoClick} />
          </div>
          <aside className="hidden lg:block w-[160px] shrink-0 pt-20">
            <SideBannerAd />
          </aside>
        </div>
      </main>

      {/* Browse Sections */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-[5%] pb-6 sm:pb-8 relative z-10">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Browse</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { label: '🔥 Trending', href: '/trending' },
            { label: '👁️ Most Viewed', href: '/most-viewed' },
            { label: '⏰ New Releases', href: '/new-releases' },
            { label: '⭐ Top Rated', href: '/top-rated' },
            { label: '📈 Popular', href: '/popular' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold bg-muted text-foreground hover:bg-gradient-to-r hover:from-coral hover:to-gold hover:text-primary-foreground transition-all duration-300 border border-border hover:border-transparent"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* Tags Section */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-[5%] pb-8 sm:pb-12 relative z-10">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Browse by Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                selectedCategory === tag
                  ? 'bg-gradient-to-r from-coral to-gold text-white'
                  : 'bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <Footer />

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
