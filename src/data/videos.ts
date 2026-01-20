export interface Video {
  id: string;
  title: string;
  thumb: string;
  src: string;
  duration: number;
  views: string;
  tags: string[];
}

export const videos: Video[] = [
  {
    id: "bunny1",
    title: "🔥 Ultra HD Bunny Stream - Exclusive Premium",
    thumb: "https://vz-33e04090-178.b-cdn.net/bf096e05-d0a9-4ec8-842a-8b3e8828ba04/thumbnail_12632361.jpg",
    src: "https://iframe.mediadelivery.net/play/582815/bf096e05-d0a9-4ec8-842a-8b3e8828ba04",
    duration: 942,
    views: "2.4M",
    tags: ["Bunny Stream", "Ultra HD", "Premium", "4K"]
  },
  {
    id: "bunny2",
    title: "Premium Bunny.net Collection - High Quality",
    thumb: "https://vz-33e04090-178.b-cdn.net/07147408-e1a6-4ccf-a618-74d4494d24f1/thumbnail_749ab13b.jpg",
    src: "https://iframe.mediadelivery.net/play/582815/07147408-e1a6-4ccf-a618-74d4494d24f1",
    duration: 1200,
    views: "1.8M",
    tags: ["Bunny", "Exclusive", "HD", "Premium"]
  },
  {
    id: "bunny3",
    title: "World's Most Exclusive Bunny Stream Content",
    thumb: "https://vz-33e04090-178.b-cdn.net/e9ff303b-7e3c-45f1-8a27-1b0bb16f95ce/thumbnail_fd34b3e8.jpg",
    src: "https://iframe.mediadelivery.net/play/582815/e9ff303b-7e3c-45f1-8a27-1b0bb16f95ce",
    duration: 1560,
    views: "3.2M",
    tags: ["4K", "Bunny Stream", "Professional", "Exclusive"]
  }
];

export const formatDuration = (secs: number): string => {
  const m = Math.floor(secs / 60);
  return `${m}:${(secs % 60).toString().padStart(2, '0')}`;
};
