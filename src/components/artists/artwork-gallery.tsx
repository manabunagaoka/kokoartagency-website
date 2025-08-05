'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { ArtworkImage, ArtworkVideo } from '@/types';

interface ArtworkGalleryProps {
  images: ArtworkImage[];
  videos?: ArtworkVideo[];
  artistName: string;
}

type MediaItem = (ArtworkImage & { type: 'image' }) | (ArtworkVideo & { type: 'video' });

export default function ArtworkGallery({ images, videos = [], artistName }: ArtworkGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Combine images and videos into a single array
  const mediaItems: MediaItem[] = [
    ...images.map(img => ({ ...img, type: 'image' as const })),
    ...videos.map(vid => ({ ...vid, type: 'video' as const }))
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

  return (
    <>
      {/* Gallery Grid */}
      <div className="masonry-grid">
        {mediaItems.map((item, index) => (
          <div
            key={item.id}
            className="masonry-item cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={item.type === 'image' ? item.url : item.thumbnail}
                alt={item.type === 'image' ? item.alt : `${item.title} video thumbnail`}
                width={item.type === 'image' ? item.width : 400}
                height={item.type === 'image' ? item.height : 300}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play size={24} className="text-gray-800 ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-sm font-medium">
                  {item.type === 'image' ? item.title : item.title}
                </h3>
              </div>
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
              <Image
                src={mediaItems[selectedIndex].url}
                alt={(mediaItems[selectedIndex] as ArtworkImage).alt}
                width={(mediaItems[selectedIndex] as ArtworkImage).width}
                height={(mediaItems[selectedIndex] as ArtworkImage).height}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={mediaItems[selectedIndex].url}
                controls
                className="max-w-full max-h-full"
                poster={(mediaItems[selectedIndex] as ArtworkVideo).thumbnail}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            <h3 className="text-lg font-medium mb-1">
              {mediaItems[selectedIndex].type === 'image' 
                ? (mediaItems[selectedIndex] as ArtworkImage).title 
                : (mediaItems[selectedIndex] as ArtworkVideo).title}
            </h3>
            <p className="text-sm text-gray-300">
              {selectedIndex + 1} of {mediaItems.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
