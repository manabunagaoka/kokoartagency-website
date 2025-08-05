import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Instagram } from 'lucide-react';
import { getArtistBySlug } from '@/lib/artists';
import ArtworkGallery from '@/components/artists/artwork-gallery';

interface ArtistPageProps {
  params: {
    slug: string;
  };
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const artist = getArtistBySlug(params.slug);

  if (!artist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/artists"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Artists
          </Link>
        </div>
      </div>

      {/* Artist Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            {artist.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            {artist.bio}
          </p>
          
          {/* Artist Links */}
          {(artist.website || artist.instagram) && (
            <div className="flex items-center justify-center space-x-6">
              {artist.website && (
                <a
                  href={artist.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Website
                </a>
              )}
              {artist.instagram && (
                <a
                  href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Instagram size={18} className="mr-2" />
                  {artist.instagram}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Artwork Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
            Artwork ({artist.images.length + (artist.videos?.length || 0)} pieces)
          </h2>
          <ArtworkGallery 
            images={artist.images} 
            videos={artist.videos}
            artistName={artist.name}
          />
        </div>
      </div>
    </div>
  );
}
