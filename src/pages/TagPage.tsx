import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Tag } from 'lucide-react';
import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import VideoPlayer from '@/components/VideoPlayer';
import Footer from '@/components/Footer';
import { videos, Video } from '@/data/videos';

const TagPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const decodedTag = decodeURIComponent(tag || '');

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
    return allVideos.filter(video =>
      video.tags?.some(t => t.toLowerCase() === decodedTag.toLowerCase()) ||
      video.categories?.some(c => c.toLowerCase() === decodedTag.toLowerCase())
    );
  }, [allVideos, decodedTag]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Tag className="w-6 h-6 text-coral" />
          <h1 className="text-2xl font-black">
            Videos tagged: <span className="text-coral">"{decodedTag}"</span>
          </h1>
          <span className="ml-2 text-sm text-muted-foreground">
            ({filteredVideos.length} videos)
          </span>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No videos found with tag "{decodedTag}"</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2 rounded-full bg-coral text-primary-foreground font-bold hover:opacity-90 transition"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredVideos.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          allVideos={filteredVideos}
          onBack={() => setSelectedVideo(null)}
          onVideoClick={(id) => {
            const v = filteredVideos.find(v => v.id === id);
            if (v) setSelectedVideo(v);
          }}
        />
      )}
    </div>
  );
};

export default TagPage;
