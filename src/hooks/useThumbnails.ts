import { useState, useEffect } from 'react';

export interface ArtistThumbnail {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  filename: string;
}

export interface ThumbnailData {
  thumbnails: ArtistThumbnail[];
  total: number;
}

export function useThumbnails() {
  const [data, setData] = useState<ThumbnailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchThumbnails() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/thumbnails');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch thumbnails: ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load thumbnails');
        console.error('Error fetching thumbnail data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchThumbnails();
  }, []);

  return {
    thumbnails: data?.thumbnails || [],
    total: data?.total || 0,
    loading,
    error
  };
}
