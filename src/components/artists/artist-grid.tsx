'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { artists } from '@/lib/data';
import ArtistCard from './artist-card';

export default function ArtistGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
          Our Artists
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Discover the exceptional artists we represent and explore their unique creative visions
        </p>
        
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Artist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>

      {filteredArtists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No artists found matching your search.</p>
        </div>
      )}
    </div>
  );
}
