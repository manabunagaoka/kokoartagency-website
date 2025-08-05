import Link from 'next/link';
import { contactInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <h3 className="text-xl font-light tracking-wide text-gray-900 mb-4">
              koko art agency
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Representing contemporary artists and showcasing exceptional artwork across all mediums.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/artists" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Artists
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                About
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
              {contactInfo.address && <p>{contactInfo.address}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © 2024 Koko Art Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
