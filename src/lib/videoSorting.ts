import { Video } from '@/data/videos';

/** Parse view strings like "2.4M", "7.5k", "1200" into numbers */
export const parseViews = (views?: string): number => {
  if (!views) return 0;
  const str = views.toLowerCase().replace(/,/g, '');
  if (str.includes('m')) return parseFloat(str) * 1_000_000;
  if (str.includes('k')) return parseFloat(str) * 1_000;
  return parseInt(str.replace(/[^0-9]/g, '')) || 0;
};

/** Sort by total view count descending */
export const sortByMostViewed = (videos: Video[]): Video[] =>
  [...videos].sort((a, b) => parseViews(b.views) - parseViews(a.views));

/** Sort by upload date newest first */
export const sortByNewest = (videos: Video[]): Video[] =>
  [...videos].sort((a, b) => {
    const dateA = a.uploadDate ? new Date(a.uploadDate).getTime() : 0;
    const dateB = b.uploadDate ? new Date(b.uploadDate).getTime() : 0;
    return dateB - dateA;
  });

/** Sort by rating/likes descending */
export const sortByTopRated = (videos: Video[]): Video[] =>
  [...videos].sort((a, b) => {
    const scoreA = (a.rating || 0) * 1000 + (a.likes || 0);
    const scoreB = (b.rating || 0) * 1000 + (b.likes || 0);
    return scoreB - scoreA;
  });

/** 
 * Trending: simulates "highest views in last 24h" by combining
 * recency (upload date) with view velocity 
 */
export const sortByTrending = (videos: Video[]): Video[] => {
  const now = Date.now();
  return [...videos].sort((a, b) => {
    const ageA = a.uploadDate ? (now - new Date(a.uploadDate).getTime()) / (1000 * 60 * 60) : 9999;
    const ageB = b.uploadDate ? (now - new Date(b.uploadDate).getTime()) / (1000 * 60 * 60) : 9999;
    // View velocity = views / age in hours (higher = more trending)
    const velocityA = parseViews(a.views) / Math.max(ageA, 1);
    const velocityB = parseViews(b.views) / Math.max(ageB, 1);
    return velocityB - velocityA;
  });
};

/** 
 * Popular: composite score from views (40%), likes (35%), comments (25%)
 */
export const sortByPopularity = (videos: Video[]): Video[] => {
  const maxViews = Math.max(...videos.map(v => parseViews(v.views)), 1);
  const maxLikes = Math.max(...videos.map(v => v.likes || 0), 1);
  const maxComments = Math.max(...videos.map(v => v.comments || 0), 1);

  return [...videos].sort((a, b) => {
    const scoreA = 
      (parseViews(a.views) / maxViews) * 0.4 +
      ((a.likes || 0) / maxLikes) * 0.35 +
      ((a.comments || 0) / maxComments) * 0.25;
    const scoreB = 
      (parseViews(b.views) / maxViews) * 0.4 +
      ((b.likes || 0) / maxLikes) * 0.35 +
      ((b.comments || 0) / maxComments) * 0.25;
    return scoreB - scoreA;
  });
};
