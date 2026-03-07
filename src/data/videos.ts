export interface Video {
  id: string;
  title: string;
  thumb: string;
  src: string;
  duration: number | string;
  views?: string;
  tags: string[];
  categories?: string[];
  addedAt?: string;
  hls?: string;
  embed?: string;
  // Extended fields for sorting
  uploadDate?: string;
  likes?: number;
  rating?: number;
  comments?: number;
}

export const videos: Video[] = [
  {
    id: "bunny1",
    title: "🔥 Ultra HD Bunny Stream - Exclusive Premium",
    thumb: "https://vz-33e04090-178.b-cdn.net/bf096e05-d0a9-4ec8-842a-8b3e8828ba04/thumbnail_12632361.jpg",
    src: "https://iframe.mediadelivery.net/play/582815/bf096e05-d0a9-4ec8-842a-8b3e8828ba04",
    duration: 942,
    views: "2.4M",
    tags: ["Bunny Stream", "Ultra HD", "Premium", "4K"],
    uploadDate: "2026-03-01",
    likes: 4200,
    rating: 4.8,
    comments: 156,
  },
  {
    id: "bunny2",
    title: "Premium Bunny.net Collection - High Quality",
    thumb: "https://vz-33e04090-178.b-cdn.net/07147408-e1a6-4ccf-a618-74d4494d24f1/thumbnail_749ab13b.jpg",
    src: "https://iframe.mediadelivery.net/play/582815/07147408-e1a6-4ccf-a618-74d4494d24f1",
    duration: 1200,
    views: "1.8M",
    tags: ["Bunny", "Exclusive", "HD", "Premium"],
    uploadDate: "2026-02-28",
    likes: 3100,
    rating: 4.6,
    comments: 98,
  },
  {
    id: "bunny3",
    title: "World's Most Exclusive Bunny Stream Content",
    thumb: "https://vz-33e04090-178.b-cdn.net/e9ff303b-7e3c-45f1-8a27-1b0bb16f95ce/thumbnail_fd34b3e8.jpg",
    src: "https://iframe.mediadelivery.net/play/582815/e9ff303b-7e3c-45f1-8a27-1b0bb16f95ce",
    duration: 1560,
    views: "3.2M",
    tags: ["4K", "Bunny Stream", "Professional", "Exclusive"],
    uploadDate: "2026-02-25",
    likes: 5800,
    rating: 4.9,
    comments: 230,
  },
  {
    id: "foreign1",
    title: "A Night to Remember in Cozy Hotel Room Vibes",
    thumb: "https://files.catbox.moe/dcdqz8.png",
    src: "https://files.catbox.moe/4l4mh5.mp4",
    duration: "12:30",
    views: "7.5k",
    tags: ["romantic", "cozy", "vibes"],
    categories: ["Foreign", "Brazz"],
    uploadDate: "2026-03-05",
    likes: 320,
    rating: 4.5,
    comments: 42,
  },
  {
    id: "foreign2",
    title: "Bella – The Dreamy Stepsister Everyone Adores",
    thumb: "https://files.catbox.moe/tkxz24.png",
    src: "https://files.catbox.moe/z0ig0s.mp4",
    duration: "15:45",
    views: "5.8k",
    tags: ["close", "connection", "youthful"],
    categories: ["Foreign", "Brazz"],
    uploadDate: "2026-03-06",
    likes: 245,
    rating: 4.3,
    comments: 31,
  },
  {
    id: "foreign3",
    title: "Blonde Beauty Enjoys a Passionate Getaway",
    thumb: "https://files.catbox.moe/0goda1.jpg",
    src: "https://files.catbox.moe/idzjb5.mp4",
    duration: "18:20",
    views: "3.7k",
    tags: ["romantic", "adventure"],
    categories: ["Foreign", "Vix"],
    uploadDate: "2026-03-04",
    likes: 180,
    rating: 4.1,
    comments: 18,
  },
  {
    id: "foreign4",
    title: "Second Date Sparks an Unforgettable Adventure",
    thumb: "https://files.catbox.moe/mw1fzd.png",
    src: "https://files.catbox.moe/afn4mh.mp4",
    duration: "14:10",
    views: "4.7k",
    tags: ["spontaneous", "energy"],
    categories: ["Foreign", "Vix"],
    uploadDate: "2026-03-03",
    likes: 210,
    rating: 4.2,
    comments: 25,
  },
  {
    id: "foreign5",
    title: "24 Hours of Pure Connection",
    thumb: "https://files.catbox.moe/epwbfb.png",
    src: "https://files.catbox.moe/1defn5.mp4",
    duration: "22:15",
    views: "7.2k",
    tags: ["group", "moments", "energy"],
    categories: ["Foreign", "Vix"],
    uploadDate: "2026-03-07",
    likes: 390,
    rating: 4.7,
    comments: 55,
  },
  {
    id: "foreign6",
    title: "Unexpected Teamwork Makes the Day Special",
    thumb: "https://files.catbox.moe/fiadbm.png",
    src: "https://files.catbox.moe/twmh5i.mp4",
    duration: "16:40",
    views: "8.2k",
    tags: ["team", "energy"],
    categories: ["Foreign", "Brazz"],
    uploadDate: "2026-03-02",
    likes: 410,
    rating: 4.6,
    comments: 48,
  },
  {
    id: "foreign7",
    title: "She Couldn't Hide Her Excitement on the Trip",
    thumb: "https://files.catbox.moe/8x0og0.png",
    src: "https://files.catbox.moe/8tqjpa.mp4",
    duration: "19:55",
    views: "4.9k",
    tags: ["adventure", "journey"],
    categories: ["Foreign", "Vix"],
    uploadDate: "2026-02-27",
    likes: 230,
    rating: 4.0,
    comments: 22,
  },
  {
    id: "foreign8",
    title: "Caring Nurse Brings Extra Comfort to Her Patient",
    thumb: "https://files.catbox.moe/prszz0.png",
    src: "https://files.catbox.moe/leivs9.mp4",
    duration: "13:25",
    views: "6.3k",
    tags: ["care", "comfort", "youthful"],
    categories: ["Foreign", "Brazz"],
    uploadDate: "2026-03-06",
    likes: 290,
    rating: 4.4,
    comments: 35,
  },
  {
    id: "foreign9",
    title: "Spoiled Princess Lives Her Best Playful Days",
    thumb: "https://files.catbox.moe/1b1f7x.png",
    src: "https://files.catbox.moe/otw0qt.mp4",
    duration: "17:30",
    views: "5.4k",
    tags: ["friends", "playful"],
    categories: ["Foreign", "Vix"],
    uploadDate: "2026-02-26",
    likes: 260,
    rating: 4.3,
    comments: 29,
  },
  {
    id: "foreign10",
    title: "Three Friends Share an Unforgettable Night of Fun",
    thumb: "https://files.catbox.moe/a7lf34.jpg",
    src: "https://files.catbox.moe/kwu0vd.mp4",
    duration: "21:10",
    views: "7.8k",
    tags: ["group", "fun", "moments"],
    categories: ["Foreign", "Brazz"],
    uploadDate: "2026-03-07",
    likes: 380,
    rating: 4.6,
    comments: 52,
  }
];

export const formatDuration = (duration: Video['duration']): string => {
  if (typeof duration === 'string') return duration;
  const m = Math.floor(duration / 60);
  return `${m}:${(duration % 60).toString().padStart(2, '0')}`;
};
