import { Artist, ContactInfo, ArtworkImage } from '@/types';
import { generatePlaceholderImage } from './utils';

export const contactInfo: ContactInfo = {
  phone: '+1 (555) 123-4567',
  email: 'hello@kokoartagency.com',
  address: '123 Art District, New York, NY 10001',
  hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM'
};

// Generate mock artwork images for each artist
function generateArtworkImages(artistName: string, count: number): ArtworkImage[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${artistName.toLowerCase().replace(' ', '-')}-${i + 1}`,
    url: generatePlaceholderImage(800 + (i * 100), 600 + (i * 50), `${artistName} Work ${i + 1}`),
    alt: `${artistName} artwork ${i + 1}`,
    title: `Untitled Work ${i + 1}`,
    width: 800 + (i * 100),
    height: 600 + (i * 50)
  }));
}

// Mock data for 20+ artists
export const artists: Artist[] = [
  {
    id: '1',
    name: 'Anna Hrachovec',
    slug: 'anna-hrachovec',
    bio: 'Contemporary artist known for vibrant textile works and mixed media installations that explore themes of identity and cultural heritage.',
    thumbnail: generatePlaceholderImage(400, 400, 'Anna Hrachovec'),
    featured: true,
    images: generateArtworkImages('Anna Hrachovec', 8),
    videos: [
      {
        id: 'ahv1',
        url: '/videos/artists/anna-hrachovec/process.mp4',
        thumbnail: generatePlaceholderImage(400, 300, 'Video Thumbnail'),
        title: 'Creative Process',
        duration: 120
      }
    ],
    website: 'https://annahrachovec.com',
    instagram: '@annahrachovec'
  },
  {
    id: '2',
    name: 'Chico Rivera',
    slug: 'chico-rivera',
    bio: 'Street artist turned gallery painter, specializing in large-scale murals and urban contemporary art with social commentary.',
    thumbnail: generatePlaceholderImage(400, 400, 'Chico Rivera'),
    featured: true,
    images: generateArtworkImages('Chico Rivera', 12),
    instagram: '@chicorivera_art'
  },
  {
    id: '3',
    name: 'Sofia Chen',
    slug: 'sofia-chen',
    bio: 'Digital artist exploring the intersection of technology and nature through immersive installations.',
    thumbnail: generatePlaceholderImage(400, 400, 'Sofia Chen'),
    featured: true,
    images: generateArtworkImages('Sofia Chen', 6),
    website: 'https://sofiachen.art'
  },
  {
    id: '4',
    name: 'Marcus Thompson',
    slug: 'marcus-thompson',
    bio: 'Abstract painter working with bold colors and geometric forms to express emotional landscapes.',
    thumbnail: generatePlaceholderImage(400, 400, 'Marcus Thompson'),
    featured: false,
    images: generateArtworkImages('Marcus Thompson', 10)
  },
  {
    id: '5',
    name: 'Elena Vasquez',
    slug: 'elena-vasquez',
    bio: 'Sculptor and installation artist creating thought-provoking pieces about social justice and human rights.',
    thumbnail: generatePlaceholderImage(400, 400, 'Elena Vasquez'),
    featured: false,
    images: generateArtworkImages('Elena Vasquez', 7),
    instagram: '@elenavasquez_art'
  },
  {
    id: '6',
    name: 'David Kim',
    slug: 'david-kim',
    bio: 'Photographer and visual storyteller documenting urban life and cultural diversity in metropolitan areas.',
    thumbnail: generatePlaceholderImage(400, 400, 'David Kim'),
    featured: false,
    images: generateArtworkImages('David Kim', 15),
    website: 'https://davidkim.photography'
  },
  {
    id: '7',
    name: 'Isabella Rodriguez',
    slug: 'isabella-rodriguez',
    bio: 'Mixed media artist combining traditional painting techniques with digital manipulation and found objects.',
    thumbnail: generatePlaceholderImage(400, 400, 'Isabella Rodriguez'),
    featured: false,
    images: generateArtworkImages('Isabella Rodriguez', 9)
  },
  {
    id: '8',
    name: 'James Wright',
    slug: 'james-wright',
    bio: 'Conceptual artist working with video, performance, and interactive installations to question reality and perception.',
    thumbnail: generatePlaceholderImage(400, 400, 'James Wright'),
    featured: false,
    images: generateArtworkImages('James Wright', 5),
    videos: [
      {
        id: 'jwv1',
        url: '/videos/artists/james-wright/installation.mp4',
        thumbnail: generatePlaceholderImage(400, 300, 'Performance'),
        title: 'Reality Check Installation',
        duration: 180
      }
    ]
  },
  {
    id: '9',
    name: 'Priya Patel',
    slug: 'priya-patel',
    bio: 'Textile artist creating intricate tapestries that blend traditional Indian craftsmanship with contemporary themes.',
    thumbnail: generatePlaceholderImage(400, 400, 'Priya Patel'),
    featured: false,
    images: generateArtworkImages('Priya Patel', 11),
    instagram: '@priyapatel_textiles'
  },
  {
    id: '10',
    name: 'Alex Morgan',
    slug: 'alex-morgan',
    bio: 'Ceramic artist and potter creating functional art pieces that challenge the boundaries between craft and fine art.',
    thumbnail: generatePlaceholderImage(400, 400, 'Alex Morgan'),
    featured: false,
    images: generateArtworkImages('Alex Morgan', 8)
  },
  {
    id: '11',
    name: 'Nina Kowalski',
    slug: 'nina-kowalski',
    bio: 'Oil painter specializing in portraiture and figurative work with emotional depth and psychological complexity.',
    thumbnail: generatePlaceholderImage(400, 400, 'Nina Kowalski'),
    featured: false,
    images: generateArtworkImages('Nina Kowalski', 13),
    website: 'https://ninakowalski.com'
  },
  {
    id: '12',
    name: 'Carlos Mendez',
    slug: 'carlos-mendez',
    bio: 'Street photographer and muralist documenting Latino culture and social movements across the Americas.',
    thumbnail: generatePlaceholderImage(400, 400, 'Carlos Mendez'),
    featured: false,
    images: generateArtworkImages('Carlos Mendez', 14),
    instagram: '@carlosmendez_foto'
  },
  {
    id: '13',
    name: 'Yuki Tanaka',
    slug: 'yuki-tanaka',
    bio: 'Minimalist sculptor working with natural materials to create meditative spaces and contemplative experiences.',
    thumbnail: generatePlaceholderImage(400, 400, 'Yuki Tanaka'),
    featured: false,
    images: generateArtworkImages('Yuki Tanaka', 6)
  },
  {
    id: '14',
    name: 'Sarah Williams',
    slug: 'sarah-williams',
    bio: 'Collage artist and printmaker exploring themes of memory, nostalgia, and the passage of time.',
    thumbnail: generatePlaceholderImage(400, 400, 'Sarah Williams'),
    featured: false,
    images: generateArtworkImages('Sarah Williams', 10),
    website: 'https://sarahwilliamsart.com'
  },
  {
    id: '15',
    name: 'Roberto Silva',
    slug: 'roberto-silva',
    bio: 'Abstract expressionist painter creating large-scale canvases that explore color relationships and emotional resonance.',
    thumbnail: generatePlaceholderImage(400, 400, 'Roberto Silva'),
    featured: false,
    images: generateArtworkImages('Roberto Silva', 9)
  },
  {
    id: '16',
    name: 'Maya Johnson',
    slug: 'maya-johnson',
    bio: 'Installation artist and environmental activist creating awareness about climate change through interactive art.',
    thumbnail: generatePlaceholderImage(400, 400, 'Maya Johnson'),
    featured: false,
    images: generateArtworkImages('Maya Johnson', 7),
    instagram: '@mayajohnson_eco'
  },
  {
    id: '17',
    name: 'Antoine Dubois',
    slug: 'antoine-dubois',
    bio: 'Neo-impressionist painter working en plein air to capture the changing light and atmosphere of urban landscapes.',
    thumbnail: generatePlaceholderImage(400, 400, 'Antoine Dubois'),
    featured: false,
    images: generateArtworkImages('Antoine Dubois', 12),
    website: 'https://antoinedubois.fr'
  },
  {
    id: '18',
    name: 'Zara Al-Hassan',
    slug: 'zara-al-hassan',
    bio: 'Calligraphy artist and graphic designer bridging traditional Arabic scripts with contemporary visual communication.',
    thumbnail: generatePlaceholderImage(400, 400, 'Zara Al-Hassan'),
    featured: false,
    images: generateArtworkImages('Zara Al-Hassan', 8)
  },
  {
    id: '19',
    name: 'Tom Anderson',
    slug: 'tom-anderson',
    bio: 'Wood sculptor and furniture maker creating functional art pieces that celebrate natural grain and organic forms.',
    thumbnail: generatePlaceholderImage(400, 400, 'Tom Anderson'),
    featured: false,
    images: generateArtworkImages('Tom Anderson', 11),
    website: 'https://tomandersonwood.com'
  },
  {
    id: '20',
    name: 'Lisa Park',
    slug: 'lisa-park',
    bio: 'Digital media artist creating interactive installations that respond to human movement and biometric data.',
    thumbnail: generatePlaceholderImage(400, 400, 'Lisa Park'),
    featured: false,
    images: generateArtworkImages('Lisa Park', 6),
    videos: [
      {
        id: 'lpv1',
        url: '/videos/artists/lisa-park/interactive.mp4',
        thumbnail: generatePlaceholderImage(400, 300, 'Interactive Art'),
        title: 'Biometric Installation Demo',
        duration: 240
      }
    ],
    instagram: '@lisapark_digital'
  }
];

export const featuredArtists = artists.filter(artist => artist.featured);
