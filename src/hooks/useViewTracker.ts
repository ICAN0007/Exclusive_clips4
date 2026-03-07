import { useEffect } from 'react';

const VIEW_COUNTS_KEY = 'ec4_view_counts';

/** Get locally stored view counts */
export const getViewCounts = (): Record<string, number> => {
  try {
    return JSON.parse(localStorage.getItem(VIEW_COUNTS_KEY) || '{}');
  } catch {
    return {};
  }
};

/** Increment view count for a video */
const incrementView = (videoId: string) => {
  const counts = getViewCounts();
  counts[videoId] = (counts[videoId] || 0) + 1;
  localStorage.setItem(VIEW_COUNTS_KEY, JSON.stringify(counts));
};

/** Hook: tracks a view when a video is watched */
export const useViewTracker = (videoId: string | null) => {
  useEffect(() => {
    if (!videoId) return;
    // Delay to ensure the user actually started watching
    const timer = setTimeout(() => incrementView(videoId), 3000);
    return () => clearTimeout(timer);
  }, [videoId]);
};

export const getLocalViewCount = (videoId: string): number => {
  return getViewCounts()[videoId] || 0;
};
