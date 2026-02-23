'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MarcusOakleyRecentWorks() {
  const recentWorks = [
    { src: '/featured/ORIGIN_COFFEE1.jpg', alt: 'Marcus Oakley - Origin Coffee 1' },
    { src: '/featured/ORIGIN_COFFEE2.jpg', alt: 'Marcus Oakley - Origin Coffee 2' },
    { src: '/featured/ORIGIN_COFFEE3.jpg', alt: 'Marcus Oakley - Origin Coffee 3' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Recent Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
        {recentWorks.map((item, index) => (
          <Link
            key={index}
            href="/artists/marcus-oakley"
            className="group block cursor-pointer"
          >
            <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 rounded-lg">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Title - Below Images */}
      <div>
        <h2 className="text-xl font-light text-gray-900 text-left">
          Recent Works by <Link href="/artists/marcus-oakley" className="hover:text-gray-600 transition-colors">Marcus Oakley</Link>: &ldquo;Origin Coffee&rdquo;{' '}
          <a 
            href="https://www.origincoffee.co.uk/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-gray-600 transition-colors"
            aria-label="Visit Origin Coffee website"
          >
            <svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </a>
        </h2>
      </div>
    </section>
  );
}
