'use client';

import { useThumbnails } from '@/hooks/useThumbnails';
import ArtistCard from './artist-card';
import { Loader2 } from 'lucide-react';

export default function ArtistGrid() {
  const { thumbnails, loading, error } = useThumbnails();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading artists...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <p className="text-red-600 mb-2">Error loading artists</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Artist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {thumbnails.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
