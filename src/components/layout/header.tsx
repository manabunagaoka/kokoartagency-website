'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { artists } from '@/lib/data';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArtistsDropdownOpen, setIsArtistsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsArtistsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/Koko_logo.png"
              alt="Koko Art Agency"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <div 
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() => setIsArtistsDropdownOpen(!isArtistsDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors font-light"
              >
                Artists
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {/* Artists Dropdown */}
              {isArtistsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <Link
                    href="/artists"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-light border-b border-gray-100 mb-1"
                    onClick={() => setIsArtistsDropdownOpen(false)}
                  >
                    View All Artists
                  </Link>
                  <div className="px-2">
                    {artists.map((artist) => (
                      <Link
                        key={artist.id}
                        href={`/artists/${artist.slug}`}
                        className="block px-2 py-0.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors rounded"
                        onClick={() => setIsArtistsDropdownOpen(false)}
                      >
                        {artist.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-gray-900 transition-colors font-light"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <div>
                <Link 
                  href="/artists" 
                  className="text-gray-700 hover:text-gray-900 transition-colors font-light block mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Artists
                </Link>
                <div className="ml-4 space-y-1 max-h-60 overflow-y-auto">
                  {artists.map((artist) => (
                    <Link
                      key={artist.id}
                      href={`/artists/${artist.slug}`}
                      className="block text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {artist.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-light"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
