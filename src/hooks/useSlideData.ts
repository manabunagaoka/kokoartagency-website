import { useState, useEffect } from 'react';

export interface SlideItem {
  id: string;
  url: string;
  artistName: string;
  type: 'image' | 'video';
  filename: string;
}

export interface SlideData {
  slides: SlideItem[];
  total: number;
}

export function useSlideData() {
  const [data, setData] = useState<SlideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlides() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/slides');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch slides: ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load slides');
        console.error('Error fetching slide data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);

  return {
    slides: data?.slides || [],
    total: data?.total || 0,
    loading,
    error
  };
}
