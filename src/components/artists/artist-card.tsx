import Link from 'next/link';
import Image from 'next/image';
import { Artist } from '@/types';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <Image
          src={artist.thumbnail}
          alt={artist.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
          {artist.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {artist.bio}
        </p>
        {(artist.website || artist.instagram) && (
          <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
            {artist.website && <span>Website</span>}
            {artist.website && artist.instagram && <span>•</span>}
            {artist.instagram && <span>Instagram</span>}
          </div>
        )}
      </div>
    </Link>
  );
}
