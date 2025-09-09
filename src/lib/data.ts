import { Artist, ContactInfo, ArtworkImage } from '@/types';
import { generatePlaceholderImage, getArtistThumbnail, getArtworkImage, getVideoThumbnail, getVideoFile } from './utils';

export const contactInfo: ContactInfo = {
  phone: '+1 (555) 123-4567',
  email: 'hello@kokoartagency.com',
  address: '123 Art District, New York, NY 10001',
  hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM'
};

// Generate mock artwork images for each artist
function generateArtworkImages(artistName: string, artistSlug: string, count: number): ArtworkImage[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${artistSlug}-${i + 1}`,
    url: getArtworkImage(artistName, i),
    alt: `${artistName} artwork ${i + 1}`,
    title: `Untitled Work ${i + 1}`,
    width: 800 + (i * 100),
    height: 600 + (i * 50)
  }));
}

// Mock data for 20 artists
export const artists: Artist[] = [
  {
    id: '1',
    name: 'ANNA HRACHOVEC',
    slug: 'anna-hrachovec',
    bio: 'Anna Hrachovec is a Chicago-based designer and artist who combines her passions for knitting and characters to create toys, installations and animations that excite people of all ages. What started out as Anna\'s hobby in 2007 has over the years grown into a huge imaginary realm called Mochimochi Land – where a cast of creatures of all sizes and types play, fight and occasionally eat each other.\n\nAnna divides her time between designing patterns that she shares with an enthusiastic crafting audience and creating knitted pieces for exhibitions and commercial projects. Her character-based soft sculptures and installations have been exhibited in galleries around the US, Europe and Asia.\n\nIn 2013 and 2014, her creations were featured in animated holiday network IDs on Nickelodeon. Anna has written five books about knitting toys, the newest of which is Adventures in Mochimochi Land, a combination storybook and pattern book.',
    thumbnail: getArtistThumbnail('ANNA HRACHOVEC'),
    featured: true,
    images: generateArtworkImages('ANNA HRACHOVEC', 'anna-hrachovec', 8),
    videos: [
      {
        id: 'ahv1',
        url: getVideoFile('anna-hrachovec', 'process'),
        thumbnail: getVideoThumbnail('anna-hrachovec', 'process'),
        title: 'Creative Process',
        duration: 120
      }
    ],
    website: 'http://annahrachovec.com/',
    facebook: 'https://www.facebook.com/mochimochiland',
    instagram: 'https://www.instagram.com/mochimochiworld/?hl=en'
  },
  {
    id: '2',
    name: 'CHICO HAYASAKI',
    slug: 'chico-hayasaki',
    bio: 'Chico Hayasaki has been working on a wide range of projects for advertising agencies, magazines and cosmetic brands around the world. Recent clients include Godiva, Afternoon Tea and LOTTE.\nShe has been a regular contributor to various charity works around the world including My Little Pony Project(USA), Snoopy \'s 60th Anniversary(China), PRODUCT (Red) T-shirt by GAP(Global), as well as "366 ART HEART COCORO," hosted by LOVE FOR NIPPON in support for the victims of earthquake in Japan.\nA resident of Yokohama, Japan, holds BFA from Lewis & Clark College in Portland.',
    thumbnail: getArtistThumbnail('CHICO HAYASAKI'),
    featured: true,
    images: generateArtworkImages('CHICO HAYASAKI', 'chico-hayasaki', 12),
    website: 'https://chicohayasaki.com/',
    instagram: 'https://www.instagram.com/chicohayasaki/'
  },
  {
    id: '3',
    name: 'CHRIS LONG',
    slug: 'chris-long',
    bio: 'Chris Long\'s studio overlooks the leafy green expanse that is Clapham Common. From there he watches as the world goes by: polished young professionals hurrying for the Tube, children dawdling to school, postmen, joggers, shoppers, tramps and would-be Jeeves. Boy racers, limos, bikes and bikers, hybrids, mom trucks, double decker buses and the occasional horse drawn hearse.\n\nIn time, he\'ll manage to capture them all in his charming, vibrant paintings that have over the years graced the pages and packaging of many: Mattel\'s My Scene, QVC, Glamour, Penguin Books, BBC Worldwide, Vogue, Perrier, Pearson and The New York Times.\n\nGrowing up beside the sea, Chris absorbed all the brash colours, bold shapes and surreal incongruity of his hometown and channeled them into his paintings. His distinctive artwork quickly earned him a place in art school and packed off to Rome with a degree in Fine Art, Chris first drew fumetti for the notorious Italian magazine Frigidaire. A long spell at the New Musical Express gave him the chance to decorate their pages with his droll and pertinent characters of the time. Chris joined CWC in the 1990\'s and immediately worked with Parco, Hanako, and Shiseido. His eye for detail and flair for characterization repeatedly attracts commissions from delighted clients in the US, Europe and Asia.',
    thumbnail: getArtistThumbnail('CHRIS LONG'),
    featured: true,
    images: generateArtworkImages('CHRIS LONG', 'chris-long', 6)
  },
  {
    id: '4',
    name: 'DOMINIQUE CORBASSON',
    slug: 'dominique-corbasson',
    bio: 'Dominique Corbasson has been illustrating since 1993, and her work has been exhibited in galleries from Paris to Tokyo. She has clients all over the world, including Xerox and Madison Square Garden in the USA and Seibu Department Store in Japan. Domestically, Dominique has illustrated for French magazines Cosmopolitan and Figaro Madame, high-profile upscale department stores Habitat, Printemps and Le Bon Marché, as well as fashion clients Hermès and Roger Vivier.\n\nDominique has also illustrated children\'s books in France for Bayard Presse, Albin Michel, and Gallimard-Jeunesse, among others.',
    thumbnail: generatePlaceholderImage(400, 400, 'DOMINIQUE CORBASSON'),
    featured: false,
    images: generateArtworkImages('DOMINIQUE CORBASSON', 'dominique-corbasson', 10),
    blogspot: 'https://lookingfordc.blogspot.com/'
  },
  {
    id: '5',
    name: 'EVELINE TARUNADJAJA',
    slug: 'eveline-tarunadjaja',
    bio: 'Indonesian born and raised, Eveline Tarunadjaja is an illustrator and designer based in Melbourne, Australia. Her artwork grew from everyday obsessions to an infatuation with patterns, textures and intricate line work.\n\nHaving completed a degree in Multimedia Design, worked at a fashion label and exhibited artwork in a solo show in 2006, Eveline decided to take on illustration full-time. Since then, she has been exhibiting her artworks in Australia, the US and Japan, as well as curating a number of group shows locally. Featured in various publications such as Hair \'em Scare \'em (Germany), Frankie Magazine (Australia), and Stella Magazine (UK), Eveline\'s work and reputation have landed her a diverse list of clients, from fashion labels Sportsgirl, Hurley, Gorman and Anna Sui to Shock Records, Penguin Books and Seventeen Magazine.\n\nWith an endless curiosity for finding intricate details in nature, a fascination with storytelling through evocative images and a desire to explore different mediums and materials, Eveline\'s delicate style is forever evolving and will surely make her slightly cross-eyed one day.',
    thumbnail: generatePlaceholderImage(400, 400, 'EVELINE TARUNADJAJA'),
    featured: false,
    images: generateArtworkImages('EVELINE TARUNADJAJA', 'eveline-tarunadjaja', 7),
    website: 'https://www.lovexevol.com/',
    instagram: 'https://www.instagram.com/evolpad/',
    facebook: 'https://www.facebook.com/lovexevol'
  },
  {
    id: '6',
    name: 'FRANÇOIS AVRIL',
    slug: 'francois-avril',
    bio: 'François was born in 1961 in Paris, France, where he currently resides. After attending the Academie Roederer Place des Vosges, he graduated with superior distinction from École National Superieure des Arts Appliques et des Metiers D\'Art. François boasts an extensive and illustrious career as a freelance illustrator, and the fact that most of his paintings sell out on the opening day of every exhibition he holds attests to his recognition and popularity.\n\nAs a cartoon artist, François\' works have been featured in numerous comic and illustrated books, including: Interieures d\'Auteur ("The Interior of an Atelier," 1990), Soire de Paris ("A Night in Paris," 1989) and Adventure des Latex ("The Adventure of a Condom," for AIDS awareness charity, 1991).',
    thumbnail: generatePlaceholderImage(400, 400, 'FRANÇOIS AVRIL'),
    featured: false,
    images: generateArtworkImages('FRANÇOIS AVRIL', 'francois-avril', 15),
    website: 'https://www.francoisavril.com/'
  },
  {
    id: '7',
    name: 'GISELA GOPPEL',
    slug: 'gisela-goppel',
    bio: 'Gisela studied textile design at the University of Arts in Berlin and illustration at the Universidad Ramon Llull in Barcelona and Palma de Mallorca.\nIn 2006 she joined the Bilderklub, an illustration platform founded by six Berlin illustrators.',
    thumbnail: generatePlaceholderImage(400, 400, 'GISELA GOPPEL'),
    featured: false,
    images: generateArtworkImages('GISELA GOPPEL', 'gisela-goppel', 9),
    website: 'https://giselagoppel.de/',
    instagram: 'https://www.instagram.com/giselagoppel/'
  },
  {
    id: '8',
    name: 'JEFFREY FULVIMARI',
    slug: 'jeffrey-fulvimari',
    bio: 'Jeffrey Fulvimari began his illustration career in 1993, and soon he was working on prestigious jobs, including commissions for Barney\'s New York and regular contributions to Interview magazine. Over the years, he has gone on to work in nearly all aspects of printed media, including advertising, sales promotion and editorial layouts. His illustrations have also been animated and broadcast on Nickelodeon, MTV and VH-1, The Food Network and numerous television commercials in Japan. Jeffrey is most recently known to a wide audience for his collaboration with Madonna, illustrating her wildly successful 13 volume set of children\'s books entitled The English Roses.\n\nIn 1998 Jeffrey was invited to exhibit his work at the Parco Gallery in Tokyo, which in turn launched his Japanese career. He has published two monographs in Japan: It\'s OK and Everything\'s Gonna Be Alright (1998) and Jeffrey Fulvimari\'s Greatest Hits (2003), an eclectic collection of drawings, photos, songs and poems. He has since exhibited extensively with solo shows of his paintings and drawings throughout Japan and Asia.\n\nBeginning in 1999, Jeffrey has produced a broad range of licensed goods in Japan and has also launched popular product lines in the US, the UK, France, Italy, Mexico and other territories. These products – covering the gamut of apparel, stationery, handbags, leather goods, bath products, household items and footwear – are sold in quality outlets including Barnes and Noble, Kohl\'s, Mark\'s and Spencer, Top Shop and others.',
    thumbnail: generatePlaceholderImage(400, 400, 'JEFFREY FULVIMARI'),
    featured: false,
    images: generateArtworkImages('JEFFREY FULVIMARI', 'jeffrey-fulvimari', 5),
    videos: [
      {
        id: 'jfv1',
        url: '/videos/artists/jeffrey-fulvimari/installation.mp4',
        thumbnail: generatePlaceholderImage(400, 300, 'Performance'),
        title: 'Reality Check Installation',
        duration: 180
      }
    ],
    instagram: 'https://www.instagram.com/jeffreyfulvimari/'
  },
  {
    id: '9',
    name: 'KANA KOBAYASHI',
    slug: 'kana-kobayashi',
    bio: 'Born in 1977, Kana Kobayashi became an illustrator after working as a hair stylist, an occupation that has influenced her artistically. In her artwork, she first creates motifs in watercolor crayon and acrylic paint, then collages them into one piece. Kana lives in Aichi, Japan.',
    thumbnail: generatePlaceholderImage(400, 400, 'KANA KOBAYASHI'),
    featured: false,
    images: generateArtworkImages('KANA KOBAYASHI', 'kana-kobayashi', 11),
    website: 'https://kanakobayashi.studio.site/',
    pinterest: 'https://www.pinterest.com/k7486/'
  },
  {
    id: '10',
    name: 'KENZO MINAMI',
    slug: 'kenzo-minami',
    bio: 'Originally from Hyogo, Japan, Kenzo graduated from Parsons School of Design with a BFA in Product Design after majoring in Western Philosophy in Japan. He started out his career as a set designer for TV broadcast networks including MTV and the Sci-Fi Channel, which led him to shoot his own shorts and TV spots. He has also done multiple projects as an interface designer with the The MIT Media Lab team.\n\nHis design KENZO MINAMI DUNNY (2006), in collaboration with Kidrobot, is a part of the MoMA Architecture and Design permanent collection.\n\nKenzo\'s work and design have also been commissioned by Mercedes-Benz, Microsoft, Dell, Raf Simons, MTV, Fuse, VH1, Sharp, Nike, Adidas, Reebok, Converse, Smart Car, Hankyu, Kose, Marui, Kidrobot, Ace Hotel, Grand Hotels NYC, Sennheiser, among others. Additionally, Kenzo started his own clothing line in the spring of 2004.',
    thumbnail: generatePlaceholderImage(400, 400, 'KENZO MINAMI'),
    featured: false,
    images: generateArtworkImages('KENZO MINAMI', 'kenzo-minami', 8),
    website: 'https://www.kenzominami.com/',
    instagram: 'https://www.instagram.com/kenzominami',
    facebook: 'https://www.facebook.com/kenzo.minami'
  },
  {
    id: '11',
    name: 'LISA GRUE',
    slug: 'lisa-grue',
    bio: 'Lisa Grue graduated from the Design School of Denmark in 2001, where she studied illustration, fashion and fine art.\n\nShe started the creative platform Underwerket in 2002, and has carved quite a name for herself and Underwerket with her work in illustrations and graphic design for books, fashion and design magazines, as well as fashion labels.\n\nLisa has garnered applause, along with occasional outrage, with her sublime cocktail of zany ideas, superbly ambiguous humor, in-your-face attitude and poetic femininity. Fashion/beauty magazines, T-shirt brands and fashion/publishing houses have all taken notice of her original work. Lisa/ Underwerket is an especially active personality in the Danish design environment, appearing in several exhibitions in Denmark and Europe. Lisa was recently honored as one of the new design talents of Denmark, with a grant from the National Art Foundation of Denmark.\n\nLisa\'s strong work has steadily brought her attention around the world and can be seen in several international books on illustration and design.',
    thumbnail: generatePlaceholderImage(400, 400, 'LISA GRUE'),
    featured: false,
    images: generateArtworkImages('LISA GRUE', 'lisa-grue', 13),
    website: 'https://lisagrue.com/en',
    instagram: 'https://www.instagram.com/lisagrue/'
  },
  {
    id: '12',
    name: 'LULU*',
    slug: 'lulu',
    bio: 'LULU* is an internationally acclaimed illustrator, working in the fields of fashion, advertising, animation and editorial design. She combines digital and hand-drawn elements to evoke poetic high-style contemporary imagery.  After graduating from the Cologne International School of Design in 2000, she pursued further studies at the fashion department of the Universität der Künste Berlin/The Berlin University of the Arts. She would then experience San Francisco and Bern, California, before moving to Berlin in 2001 to set up her studio.  LULU*s work has been featured in both the US and internationally, published in books like: Illustration Now! fashion from Taschen Verlag, The Beautiful: Illustrations for Fashion and Style from Gestalten, in collaboration with Berlinverlag, etc.\nSelected clients: Givenchy , Bulgari, Bloomingdales, Time, IBM, Mercedes Benz, Universal Music, Vogue Pelle (Italy), Vogue Nippon, Madame (Ger), AD (France), Frau (Japan), Tush Magazine, Clarins, Holt Renfrew, Weleda, Designhotels, Glamour, DDB (France), Vitra, Vespa, Swarovski, Pantene, Verve, etc.',
    thumbnail: generatePlaceholderImage(400, 400, 'LULU*'),
    featured: false,
    images: generateArtworkImages('LULU*', 'lulu', 14),
    website: 'https://www.plasticpirate.com/',
    instagram: 'https://www.instagram.com/designersfamily/',
    facebook: 'https://www.facebook.com/profile.php?id=100031908626719#'
  },
  {
    id: '13',
    name: 'MARCUS OAKLEY',
    slug: 'marcus-oakley',
    bio: 'Originally from Norfolk, Marcus\' work is inspired by many things – both retrospective and contemporary. These influences include the wonderful harmonic and melodic music of the Beach Boys; the pastoral and folkloric delights of the countryside and the animals that inhabit it; the joys of cycling; the stimulations of tea; the dizzy geometries of architecture and design – and overall the wonders of making stuff.',
    thumbnail: generatePlaceholderImage(400, 400, 'MARCUS OAKLEY'),
    featured: false,
    images: generateArtworkImages('MARCUS OAKLEY', 'marcus-oakley', 6),
    website: 'http://www.marcusoakley.com/',
    instagram: 'https://www.instagram.com/marcus_oakley/',
    pinterest: 'https://www.pinterest.com/marcusoakley/',
    blogspot: 'https://marcusoakley.blogspot.com/'
  },
  {
    id: '14',
    name: 'MASAKI RYO',
    slug: 'masaki-ryo',
    bio: 'After graduating from Kanazawa Arts & Crafts University, Masaki worked at Yakult\'s advertising department as a graphic designer for 9 years.\n\nIn 1993 Masaki started his career as a freelance illustrator. He drew everything from fruits to fashion, and his work reflected both an enthusiasm as well as a fascination with illustration in and of itself. Yet Masaki gradually became aware of the fact that his favorite themes were fashion and cosmetics – this seemed only natural as his father had been a tailor of women\'s clothing and Masaki himself had spent time during his childhood playing with a sewing machine.\n\nIn 2000, Masaki introduced his new fashion paintings executed in his signature style: Masaki\'s approach to illustration involves the use of painting knife and acrylic paint, which he will then adjust digitally.\n\nBranching away from his signature fashion illustrations, Masaki\'s recent artwork has been inspired by his pet dog, a miniature schnauzer. His ability to capture the endearing and playful nature of our canine companions has caught many people\'s eyes and has earned the recognition of various clients including the renowned stationary company Caspari, Inc. They have released a line of products featuring Masaki\'s illustrations of dogs and other subjects, which have been very popular in the US, Europe and Japan.',
    thumbnail: generatePlaceholderImage(400, 400, 'MASAKI RYO'),
    featured: false,
    images: generateArtworkImages('MASAKI RYO', 'masaki-ryo', 10),
    website: 'https://masakiryo.com/',
    instagram: 'https://www.instagram.com/m.r.y.o/',
    facebook: 'https://www.facebook.com/Illustratormasakiryo',
    pinterest: 'https://www.pinterest.com/masakiryo8/'
  },
  {
    id: '15',
    name: 'MASAYUKI OGISU',
    slug: 'masayuki-ogisu',
    bio: 'In 1994 Masayuki graduated from Bunka Fukuso Gakuin, a highly regarded fashion design school in Tokyo, where he majored in apparel design. He then worked as an editor at Marvel Comic Japan for a year.\nFrom 1996 until 1998, Masayuki lived in New York working as a freelance illustrator for clients such as Anna Sui and Marie Claire. He has since returned to Japan where he continues his career in illustration.\nMasayuki\'s work has been exhibited in New York and in several major cities throughout Japan.',
    thumbnail: generatePlaceholderImage(400, 400, 'MASAYUKI OGISU'),
    featured: false,
    images: generateArtworkImages('MASAYUKI OGISU', 'masayuki-ogisu', 9),
    instagram: 'https://www.instagram.com/masayukiogisu/',
    facebook: 'https://www.facebook.com/ogisu'
  },
  {
    id: '16',
    name: 'Miho_S',
    slug: 'miho-s',
    bio: 'Miho_S, Miho Sadogawa was behind the creative venture of Erotic Dragon and was an integral member of the mothership Furi Furi Company since its founding. Her style is marked by a unique fusion of Japanese pop sensibility and the ethnic traditions of various other Asian cultures.\n\nHer work has been featured in the "Always" print advertisement campaign for Procter&Gamble in many major women\'s magazines. In 2003, Miho was commissioned to illustrate the cover and one of the fairy tales for GRIMM, a contemporary version of the Grimm fairy tales published by Die Gestalten Verlag.\n\nFrom 2004 –2005, Miho went on to work even more closely with Die Gestalten in creating Life of Buddha, a visionary book project for which Miho took on primary design, illustration and story development duties. The book was based on the classic tale of Siddhartha\'s path to becoming Buddha and was deftly illustrated throughout with Miho\'s visuals.\n\nAn avid fan of Ingress, Miho was discovered by John Hanke, the founder of Niantic, Inc. In 2014, she worked closely with Ingress to provide her artworks for their promotions and merchandising projects.',
    thumbnail: generatePlaceholderImage(400, 400, 'Miho_S'),
    featured: false,
    images: generateArtworkImages('Miho_S', 'miho-s', 7),
    instagram: 'https://www.instagram.com/miho_s_0919/'
  },
  {
    id: '17',
    name: 'STINA PERSSON',
    slug: 'stina-persson',
    bio: 'Stina uses ink, watercolor or collages with ceremonial Mexican cut papers to create a style that is both vivid and elegant. She fuses the traditional with the edgy to introduce a modern look to illustration – a look that is appreciated by numerous clients including Nike, Microsoft, Louis Vuitton, Veuve Clicquot, L\'Oreal, O.P.I., Vogue Japan, W Magazine and WWD Magazine.\n\nStina studied fine art in Perugia and fashion drawing in Florence. She also has a degree in illustration from the Pratt Institute in New York. Stina was awarded the Society of Illustrator\'s Student Scholarship in 1996 and 1997, and has exhibited her work in several shows in New York and Japan.',
    thumbnail: generatePlaceholderImage(400, 400, 'STINA PERSSON'),
    featured: false,
    images: generateArtworkImages('STINA PERSSON', 'stina-persson', 12),
    website: 'https://www.stinapersson.com/',
    instagram: 'https://www.instagram.com/stina_persson_illustration/',
    facebook: 'https://www.facebook.com/StinaPerssonIllustration'
  },
  {
    id: '18',
    name: 'SUPERDEUX',
    slug: 'superdeux',
    bio: 'Sebastien Roux aka SUPERDEUX was born and raised in the south of France, worked and studied in Paris and currently resides in Lille, France.\n\nSUPERDEUX began his career as a designer over eight years ago, working in interior design for two years and later developed his career in multi-media design. In 2001, he launched his career as a freelance graphic designer. He currently produces work in motion graphics, character design, identity design and toy design. Urban pop culture and its ever-changing faces are the inspirational elements for his project development and designs.\n\nSUPERDEUX\'s work has appeared in books and magazines in France, Germany, Hong Kong, Australia, the US and Canada. He has worked in collaboration with talented forces including Phunk Studio, 123Klan, Stardust, Genevieve Gauckler, Bill McMullen, Staple Design, Interspectacular and Pictoplasma to pursue his goal of exploring various mediums of communicating the urban sensibility.',
    thumbnail: generatePlaceholderImage(400, 400, 'SUPERDEUX'),
    featured: false,
    images: generateArtworkImages('SUPERDEUX', 'superdeux', 8),
    website: 'https://www.deux.me/',
    instagram: 'https://www.instagram.com/superdeux/',
    facebook: 'https://www.facebook.com/superdeux'
  },
  {
    id: '19',
    name: 'TINA BERNING',
    slug: 'tina-berning',
    bio: 'Tina studied graphic design with a focus in illustration in Nürnberg, Germany. After three years of designing album covers and band posters for record companies, she worked as a graphic designer at Jetzt, the supplementary magazine of the biggest German daily newspaper, Die SüddeutscheZeitung.\n\nIn 1999, Tina decided to quit pushing letters and pictures around and started focusing on her illustrations again. She moved to Berlin and quickly found herself involved in both commercial and editorial work.',
    thumbnail: generatePlaceholderImage(400, 400, 'TINA BERNING'),
    featured: false,
    images: generateArtworkImages('TINA BERNING', 'tina-berning', 11),
    website: 'https://www.tinaberning.de/',
    instagram: 'https://www.instagram.com/tina_berning/'
  },
  {
    id: '20',
    name: 'TOMOTO',
    slug: 'tomoto',
    bio: 'Born in Kumamoto prefecture, Japan, Tomoto graduated from the Visual Design department of Kyoto Art University in 1992. After working at design firms for a few years, she became a freelance illustrator in 1998. In 2004 she became a semifinalist for CWC\'s "Fresh Characters Found" exhibition, and in 2005 was chosen to be one of the finalists for CWC\'s Chance exhibition. She is now a part of the KOKO Art Agency roster as well!\n\nTomoto\'s illustrations are known for their use of bright colors and unique textures. Her cute characters give off warmth and a sense of genuine kindness.',
    thumbnail: generatePlaceholderImage(400, 400, 'TOMOTO'),
    featured: false,
    images: generateArtworkImages('TOMOTO', 'tomoto', 6),
    videos: [
      {
        id: 'tv1',
        url: '/videos/artists/tomoto/interactive.mp4',
        thumbnail: generatePlaceholderImage(400, 300, 'Interactive Art'),
        title: 'Interactive Installation Demo',
        duration: 240
      }
    ],
    website: 'https://www.tomotoweb.com/',
    instagram: 'https://www.instagram.com/tomotoillustrations/'
  }
];

export const featuredArtists = artists.filter(artist => artist.featured);
