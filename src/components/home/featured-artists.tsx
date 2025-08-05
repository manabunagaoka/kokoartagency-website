import Link from 'next/link';
import Image from 'next/image';
import { featuredArtists } from '@/lib/data';

export default function FeaturedArtists() {
  const displayArtists = featuredArtists.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Featured Artists
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the talented artists we represent and explore their unique creative visions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayArtists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artists/${artist.slug}`}
            className="group block"
          >
            <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4">
              <Image
                src={artist.thumbnail}
                alt={artist.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
              {artist.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {artist.bio}
            </p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/artists"
          className="inline-block bg-gray-900 text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors"
        >
          View All Artists
        </Link>
      </div>
    </section>
  );
}
