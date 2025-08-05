import Image from 'next/image';
import Link from 'next/link';
import { featuredArtists } from '@/lib/data';

export default function HeroSection() {
  const heroArtist = featuredArtists[0]; // First featured artist as hero

  if (!heroArtist) return null;

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroArtist.thumbnail}
          alt={`${heroArtist.name} artwork`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
          Discover Contemporary Art
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Representing exceptional artists and showcasing their extraordinary work
        </p>
        <div className="space-x-4">
          <Link
            href="/artists"
            className="inline-block bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
          >
            View Artists
          </Link>
          <Link
            href={`/artists/${heroArtist.slug}`}
            className="inline-block border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-black transition-colors"
          >
            Featured: {heroArtist.name}
          </Link>
        </div>
      </div>
    </section>
  );
}
