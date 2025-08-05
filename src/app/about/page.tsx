import ContactSection from '@/components/about/contact-section';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              About Koko Art Agency
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are dedicated to representing exceptional contemporary artists and connecting them with collectors, galleries, and art enthusiasts around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At Koko Art Agency, we believe in the transformative power of contemporary art. Our mission is to bridge the gap between exceptional artists and the wider world, creating meaningful connections that enrich both the art community and society at large.
                </p>
                <p>
                  We are committed to supporting artists at every stage of their career, providing them with the resources, exposure, and opportunities they need to thrive in today's dynamic art market.
                </p>
                <p>
                  Through carefully curated exhibitions, strategic partnerships, and innovative digital platforms, we showcase diverse voices and perspectives that challenge, inspire, and move audiences.
                </p>
              </div>
            </div>
            <div className="lg:pl-8">
              <h3 className="text-2xl font-light text-gray-900 mb-6">What We Offer</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-gray-900 font-medium mr-2">•</span>
                  Artist representation and career development
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-medium mr-2">•</span>
                  Exhibition planning and curation
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-medium mr-2">•</span>
                  Art collection consulting
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-medium mr-2">•</span>
                  Digital portfolio development
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-medium mr-2">•</span>
                  Market analysis and art investment guidance
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-medium mr-2">•</span>
                  International art fair participation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our relationships with artists, collectors, and the broader art community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Authenticity</h3>
              <p className="text-gray-600">
                We champion genuine artistic expression and support artists who stay true to their unique vision and voice.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards in everything we do, from artist selection to client service and exhibition quality.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We embrace new technologies and creative approaches to connect art with audiences in meaningful ways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
