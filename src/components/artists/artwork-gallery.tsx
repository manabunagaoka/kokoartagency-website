'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Play, Loader2 } from 'lucide-react';
import { useArtistImages } from '@/hooks/useArtistImages';

interface ArtworkGalleryProps {
  artistSlug: string;
}

type MediaItem = {
  id: string;
  url: string;
  title: string;
  type: 'image' | 'video';
  thumbnail?: string;
  alt?: string;
};

// Column count per Tailwind breakpoint (md 768, lg 1024, xl 1280)
function useColumnCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCount(w >= 1280 ? 4 : w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

export default function ArtworkGallery({ artistSlug }: ArtworkGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { images, videos, loading, error } = useArtistImages(artistSlug);
  const columnCount = useColumnCount();

  // Combine images and videos into a single array
  const mediaItems: MediaItem[] = [
    ...images.map((img, index) => ({ 
      id: `image-${index}`,
      url: img.url, 
      title: img.title,
      alt: img.alt,
      type: 'image' as const 
    })),
    ...videos.map(vid => ({ 
      id: vid.id,
      url: vid.url, 
      title: vid.title,
      thumbnail: vid.thumbnail,
      type: 'video' as const 
    }))
  ];

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedIndex(selectedIndex === 0 ? mediaItems.length - 1 : selectedIndex - 1);
    } else {
      setSelectedIndex(selectedIndex === mediaItems.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-600">Loading artwork...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-2">Error loading artwork</p>
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  if (mediaItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No artwork available for this artist yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* Masonry gallery: items dealt left-to-right into columns so reading order
          stays 1, 2, 3... across the top while each column stacks without gaps */}
      <div className="flex gap-6 items-start">
        {Array.from({ length: columnCount }, (_, col) => (
          <div key={col} className="flex-1 min-w-0 flex flex-col gap-6">
            {mediaItems.map((item, index) => index % columnCount !== col ? null : (
          <div
            key={item.id}
            className="cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={item.type === 'image' ? item.url : (item.thumbnail || item.url)}
                alt={item.alt || `${item.title}`}
                width={600}
                height={400}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                unoptimized
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play size={24} className="text-gray-800 ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>
            ))}
          </div>
        ))}
      </div>
      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X size={32} />
          </button>
          
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-4xl max-h-full flex items-center justify-center">
            {mediaItems[selectedIndex].type === 'image' ? (
              <div className="relative max-w-full max-h-full">
                <Image
                  src={mediaItems[selectedIndex].url}
                  alt={mediaItems[selectedIndex].alt || mediaItems[selectedIndex].title}
                  width={800}
                  height={600}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <video
                src={mediaItems[selectedIndex].url}
                controls
                className="max-w-full max-h-full"
                poster={mediaItems[selectedIndex].thumbnail}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="text-sm text-gray-300">
              {selectedIndex + 1} of {mediaItems.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
