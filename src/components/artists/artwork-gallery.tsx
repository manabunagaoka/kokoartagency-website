'use client';

import { useState } from 'react';
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

export default function ArtworkGallery({ artistSlug }: ArtworkGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { images, videos, loading, error } = useArtistImages(artistSlug);
  
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
      {/* Gallery Grid - Masonry Layout */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {mediaItems.map((item, index) => (
          <div
            key={item.id}
            className="cursor-pointer group break-inside-avoid mb-6"
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
