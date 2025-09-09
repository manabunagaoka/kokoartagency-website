import Link from 'next/link';
import Image from 'next/image';
import { Artist } from '@/types';
import { ArtistThumbnail } from '@/hooks/useThumbnails';

interface ArtistCardProps {
  artist: Artist | ArtistThumbnail;
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
      <div className="p-3 text-center">
        <h3 className="text-sm font-light text-gray-900 group-hover:text-gray-600 transition-colors">
          {artist.name}
        </h3>
      </div>
    </Link>
  );
}
