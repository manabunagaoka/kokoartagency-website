'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Loader2 } from 'lucide-react';
import { useSlideData } from '@/hooks/useSlideData';

export default function ArtworkSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { slides, loading, error } = useSlideData();

  // Auto-advance slides
  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div 
          className="flex items-center justify-center bg-gray-50 rounded-lg h-80 md:h-[650px]"
          style={{ 
            aspectRatio: '2100 / 1350',
            maxWidth: '100%'
          }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading slideshow...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div 
          className="flex items-center justify-center bg-gray-50 rounded-lg h-80 md:h-[650px]"
          style={{ 
            aspectRatio: '2100 / 1350',
            maxWidth: '100%'
          }}
        >
          <p className="text-gray-600">Unable to load slideshow</p>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="flex justify-center">
        {/* Main Slide Container - Responsive Height */}
        <div 
          className="relative overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center w-full h-80 md:h-[650px]"
          style={{ 
            aspectRatio: '2100 / 1350',
            maxWidth: '100%'
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {slide.type === 'image' ? (
                <Image
                  src={slide.url}
                  alt={`${slide.artistName} artwork`}
                  fill
                  className="object-contain md:object-cover"
                  priority={index === currentIndex}
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={slide.url}
                    className="w-full h-full object-contain md:object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Play size={12} className="mr-1" />
                    Video
                  </div>
                </div>
              )}
              
              {/* Artist Name Overlay - Lower Left */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded">
                <h3 className="text-base md:text-lg font-medium">{slide.artistName}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
