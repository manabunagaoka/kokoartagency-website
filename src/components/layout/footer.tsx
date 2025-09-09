import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Contact */}
          <div>
            <h3 className="text-xl font-light tracking-wide text-gray-900 mb-4">
              KOKO Art Agency
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>tel: <a href="tel:+16463196398" className="hover:text-gray-900">+1 646.319.6398</a></p>
              <p>email: <a href="mailto:agent@kokoartagency.com" className="hover:text-gray-900">agent@kokoartagency.com</a></p>
              <p>New York, U.S.A.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-light text-gray-900 mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/artists" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Artists
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                About
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-light text-gray-900 mb-4">Follow Us</h4>
            <div className="flex flex-col space-y-2">
              <a 
                href="https://www.instagram.com/koko.art.agency" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Instagram
              </a>
              <a 
                href="https://www.facebook.com/kokoartagency" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Facebook
              </a>
              <a 
                href="https://www.pinterest.com/kokoartagency/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500 space-y-1">
            <p>©2025 KOKO Art Agency, Inc.</p>
            <p>All rights of images, videos and text on this site are reserved by the respective artists and KOKO Art Agency, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
