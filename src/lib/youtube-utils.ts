/**
 * Utility functions for YouTube video handling
 */

/**
 * Extracts video ID from various YouTube URL formats
 */
export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Generates YouTube thumbnail URL with fallback
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'maxres'
): string {
  // Use hqdefault as fallback since maxresdefault might not exist for all videos
  const fallbackQuality = quality === 'maxres' ? 'hq' : quality;
  return `https://img.youtube.com/vi/${videoId}/${fallbackQuality}default.jpg`;
}

/**
 * Generates YouTube embed URL
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}
