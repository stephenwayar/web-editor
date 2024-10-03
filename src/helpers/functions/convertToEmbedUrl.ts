export function convertToEmbedUrl(url: string): string {
  // Check if the URL contains 'watch?v='
  if (url.includes('watch?v=')) {
    // Extract the video ID by splitting at 'watch?v=' and removing anything after the video ID
    const videoId = url.split('watch?v=')[1].split('&')[0];

    return `https://www.youtube.com/embed/${videoId}`;
  }

  // If the URL is already in embed format, strip params and return clean embed URL
  if (url.includes('/embed/')) {
    const embedId = url.split('/embed/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${embedId}`;
  }

  // Return original URL if it doesn't match the expected format
  return url;
}