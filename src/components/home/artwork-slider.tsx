'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredArtists } from '@/lib/data';

export default function ArtworkSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Collect all featured artworks
  const featuredArtworks = featuredArtists.flatMap(artist => 
    artist.images.slice(0, 2).map(image => ({ ...image, artistName: artist.name, artistSlug: artist.slug }))
  );

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredArtworks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredArtworks.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  if (featuredArtworks.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Featured Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A curated selection of exceptional pieces from our represented artists
        </p>
      </div>

      <div className="relative">
        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg bg-gray-100">
          {featuredArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentIndex ? 'translate-x-0' : 
                index < currentIndex ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <Image
                src={artwork.url}
                alt={artwork.alt}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-white text-lg font-medium">{artwork.title}</h3>
                <p className="text-white/80 text-sm">by {artwork.artistName}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {featuredArtworks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
