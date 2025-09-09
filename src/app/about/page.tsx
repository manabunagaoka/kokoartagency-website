export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              KOKO Art Agency is a boutique illustration and design agency based in New York City. Since our founding in 1999 under the name CWC International, we have served as a creative content partner connecting exceptional art and design talent with our international clients. We oversee our artists in their production of unique and impactful handwrought assets for use across communication mediums, including:
            </p>
            
            <ul className="space-y-2 ml-4">
              <li>• Cross-platform Social Media Campaigns</li>
              <li>• Packaging & Surface Design + In-store Displays</li>
              <li>• Editorial & Publishing</li>
              <li>• Online Ads, Website Design & Video/Animation</li>
              <li>• Live Painting/Murals at Events</li>
            </ul>
            
            <div className="pt-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4">CLIENTS</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-light text-gray-900 mb-2">BRANDS //</h3>
                  <p className="text-gray-700">
                    Target, Nike, Reebok, Mercedes-Benz, Veuve Clicquot, Tiffany & Co, Louis Vuitton, MAC Cosmetics, Urban Decay, Banana Republic, Levi&apos;s, OPI, Microsoft, Google, NBC, Nickelodeon, HGTV, TED Global, Ace Hotels, Harper Collins, Chronicle Books, Penguin Books, among others.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-light text-gray-900 mb-2">AGENCIES //</h3>
                  <p className="text-gray-700">
                    Ogilvy, McCann Worldgroup, BBDO, Mother London, adam&eveDDB, ustwo, Brand Union, Landor, 72 and Sunny, TAXI, Saatchi Wellness, among others.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4">CONTACT</h2>
              <p className="text-gray-700">
                tel: <a href="tel:+16463196398" className="hover:text-gray-900">+1 646.319.6398</a><br />
                email: <a href="mailto:agent@kokoartagency.com" className="hover:text-gray-900">agent@kokoartagency.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
