import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Video } from '@/data/videos';
import { sortByMostViewed } from '@/lib/videoSorting';
import VideoGrid from '@/components/VideoGrid';
import VideoPlayer from '@/components/VideoPlayer';
import Footer from '@/components/Footer';
import { SideBannerAd } from '@/components/AdScripts';

const MostViewed = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const { data: videos = [] } = useQuery({
    queryKey: ['videos-json'],
    queryFn: async () => {
      const res = await fetch('/videos.json');
      const json = await res.json();
      return Array.isArray(json) ? json : json.videos;
    },
  });

  const sorted = useMemo(() => sortByMostViewed(videos), [videos]);
  const selectedVideoData = videos.find((v: Video) => v.id === selectedVideo);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto pt-8 px-4 md:px-8 flex gap-6">
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-black gradient-text mb-2">👁️ Most Viewed</h1>
            <p className="text-muted-foreground">Sorted by total view count</p>
          </div>
          <VideoGrid videos={sorted} onVideoClick={setSelectedVideo} title="👁️ MOST VIEWED" perPage={20} />
        </div>
        <aside className="hidden lg:block w-[160px] shrink-0 pt-16">
          <SideBannerAd />
        </aside>
      </div>
      <Footer />
      {selectedVideo && selectedVideoData && (
        <VideoPlayer video={selectedVideoData} onBack={() => setSelectedVideo(null)} onVideoClick={setSelectedVideo} allVideos={videos} />
      )}
    </div>
  );
};

export default MostViewed;
