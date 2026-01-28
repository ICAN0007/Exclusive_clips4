import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Video } from '@/data/videos';
import VideoGrid from '@/components/VideoGrid';
import VideoPlayer from '@/components/VideoPlayer';

const Trending = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const { data: videos = [] } = useQuery({
    queryKey: ['videos-json'],
    queryFn: async () => {
      const res = await fetch('/videos.json');
      const json = await res.json();
      return Array.isArray(json) ? json : json.videos;
    }
  });

  // Filter trending videos
  const trendingVideos = videos.filter((v: Video) => 
    v.tags?.some((tag: string) => tag.toLowerCase() === 'trending')
  );

  const selectedVideoData = videos.find((v: Video) => v.id === selectedVideo);

  return (
    <div className="min-h-screen bg-background pt-8 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black gradient-text mb-2">
            🔥 Trending
          </h1>
          <p className="text-muted-foreground">What's hot right now</p>
        </div>
        
        <VideoGrid 
          videos={trendingVideos.length > 0 ? trendingVideos : videos} 
          onVideoClick={setSelectedVideo}
        />
        
        {selectedVideo && selectedVideoData && (
          <VideoPlayer 
            video={selectedVideoData} 
            onBack={() => setSelectedVideo(null)}
            onVideoClick={setSelectedVideo}
            allVideos={videos}
          />
        )}
      </div>
    </div>
  );
};

export default Trending;
