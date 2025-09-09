import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Instagram, Facebook } from 'lucide-react';
import { getArtistBySlug } from '@/lib/artists';
import ArtworkGallery from '@/components/artists/artwork-gallery';

interface ArtistPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

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
        </div>

        {/* Artwork Gallery */}
        <div className="mb-12">
          <ArtworkGallery 
            artistSlug={slug}
          />
        </div>

        {/* Artist Bio and Links Section */}
        <div className="max-w-4xl mx-auto">
          {/* Bio */}
          <div className="mb-8">
            <div className="prose prose-gray max-w-none">
              {artist.bio.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {/* Artist Links */}
          {(artist.website || artist.instagram || artist.facebook || artist.pinterest || artist.blogspot) && (
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    WEBSITE
                  </a>
                )}
                {artist.instagram && (
                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Instagram size={16} className="mr-2" />
                    INSTAGRAM
                  </a>
                )}
                {artist.facebook && (
                  <a
                    href={artist.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Facebook size={16} className="mr-2" />
                    FACEBOOK
                  </a>
                )}
                {artist.pinterest && (
                  <a
                    href={artist.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    PINTEREST
                  </a>
                )}
                {artist.blogspot && (
                  <a
                    href={artist.blogspot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    BLOGSPOT
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
