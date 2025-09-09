'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedArtistSpotlight() {
  const featuredImages = [
    { src: '/featured/2_stina.jpg', alt: 'Stina Persson artwork 1', type: 'image' },
    { src: '/featured/3_stina.png', alt: 'Stina Persson artwork 2', type: 'image' },
    { src: '/featured/1_stina.mov', alt: 'Stina Persson artwork video', type: 'video' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Featured Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
        {featuredImages.map((item, index) => (
          <Link
            key={index}
            href="/artists/stina-persson"
            className="group block cursor-pointer"
          >
            <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 rounded-lg">
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <video
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={item.src} type="video/mp4" />
                  <source src={item.src} type="video/quicktime" />
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <p className="text-gray-500">Video not supported</p>
                  </div>
                </video>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Artist Title - Now Below Images */}
      <div>
        <h2 className="text-xl font-light text-gray-900 text-left">
          Featured Artist: <Link href="/artists/stina-persson" className="hover:text-gray-600 transition-colors">Stina Persson</Link>
        </h2>
      </div>
    </section>
  );
}
