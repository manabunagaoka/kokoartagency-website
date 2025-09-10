import { useState, useEffect } from 'react';

export interface ArtistImage {
  url: string;
  alt: string;
  title: string;
}

export interface ArtistVideo {
  id: string;
  url: string;
  thumbnail?: string;
  title: string;
}

export interface ArtistImageData {
  id: string;
  url: string;
  filename: string;
  title: string;
}

export interface ArtistMediaData {
  images: ArtistImageData[];
  videos: ArtistVideo[];
}

export function useArtistImages(slug: string) {
  const [data, setData] = useState<ArtistMediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/artists/${slug}/images`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
        console.error('Error fetching artist images:', err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchImages();
    }
  }, [slug]);

  // Convert API image data to ArtistImage objects
  const images: ArtistImage[] = data?.images.map((imageData) => ({
    url: imageData.url,
    alt: imageData.title,
    title: imageData.title
  })) || [];

  return {
    data,
    images,
    videos: data?.videos || [],
    loading,
    error,
    totalImages: data?.images.length || 0,
    totalVideos: data?.videos.length || 0
  };
}
