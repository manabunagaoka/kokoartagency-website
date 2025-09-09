
import { NextRequest, NextResponse } from 'next/server';

const ARTIST_IMAGE_DATA: Record<string, {
  images: string[];
  videos: Array<{ id: string; filename: string; title: string }>;
}> = {
  "anna-hrachovec": {
    images: [
      "1computercat_computer600.jpg", "2hanginthere_text600b.gif", "3kokoandpuff600.jpg", 
      "4knittinggnome600.gif", "5bud_river600.jpg", "6catsidedown_text600.gif", 
      "7catsideup_text600.gif", "8dogsnbooks_yellowframe600.jpg", "9sunspin600.gif", 
      "10HHA2025_600.gif", "11peeweedance600.gif", "12votevstrump600c.gif", 
      "13spongebob_mail.jpg", "14slimer.jpg", "15staypuft_frontwhite.jpg", 
      "16balls_postcard600.jpg", "17matryoshcats_arch600.jpg", "18toucans.png", 
      "19otto_likeness600.jpg", "20jumbognome_postcard600.jpg"
    ],
    videos: []
  },
  "chico-hayasaki": {
    images: [
      "1woman_アジザイ.jpg", "2woman_無題.jpg", "3woman_f01.jpg", "4woman_fourseasons.jpg", 
      "5WB_woman_blackdress.jpg", "6beauty01.jpeg", "7beauty03.jpeg", "8butterflyheels.jpg", 
      "9flower_cosmos.jpg", "10flowers02.jpg", "11flowers04.jpg", "12fashion_shoes01.jpeg", 
      "13fashion_shoes02.jpeg", "14fashion_shoes03.jpeg", "15Valentino.jpg", 
      "16salondeperfume_isetan.jpg", "17WB_woman_feerique.jpg", "18WB_woman_ootd.jpg", 
      "19woman_beauty.jpg", "20apartment.jpg"
    ],
    videos: []
  },
  // ...existing code for all other artists...
  "tomoto": {
    images: [
      "1-Bird and Flowers.jpg", "2_WB_DXE_2025_tomoto_1.jpg", "3-Berry with cupcakes.jpg", 
      "4-Dango.jpg", "5-Hello March.png", "6-Sheep with Flowers.png", "7-Halloween Cat.jpg", 
      "8-Halloween Friends.jpg", "9-Screenshot 2025-08-12 at 4.27.09 PM.png", 
      "10-Honda_Calendar_11.jpg", "11-Honda_Calendar_05.jpg", "12-Kiehl's.jpg", 
      "13-Macaron.jpg", "14-tomoto_Donkey.jpg", "15-Watermelon.jpg", "16-Mudpuppy Puzzle.png", 
      "17-horoscope_all_tomoto.jpg", "18-TOMOTO.png", "19-WB_PrintBook_tomoto_4.jpg", 
      "20-Floral Heart.jpg"
    ],
    videos: []
  }
};

function getArtistFolderName(slug: string): string {
  const folderMapping: Record<string, string> = {
    'anna-hrachovec': 'AnnaHrachovec',
    'chico-hayasaki': 'ChicoHayasaki',
    'chris-long': 'ChrisLong',
    'dominique-corbasson': 'DominiqueCorbasson',
    'eveline-tarunadjaja': 'EvelineTarunadjaja',
    'francois-avril': 'FrançoisAvril',
    'gisela-goppel': 'GiselaGoppel',
    'jeffrey-fulvimari': 'JeffreyFulvimari',
    'kana-kobayashi': 'KanaKobayashi',
    'kenzo-minami': 'KenzoMinami',
    'lisa-grue': 'LisaGrue',
    'lulu': 'LULU*',
    'marcus-oakley': 'MarcusOakley',
    'masaki-ryo': 'MasakiRyo',
    'masayuki-ogisu': 'MasayukiOgisu',
    'miho-s': 'Miho_S',
    'stina-persson': 'StinaPersson',
    'superdeux': 'Superdeux',
    'tina-berning': 'TinaBerning',
    'tomoto': 'TOMOTO'
  };
  return folderMapping[slug] || slug;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const artistData = ARTIST_IMAGE_DATA[slug];
    if (!artistData) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }
    const folderName = getArtistFolderName(slug);
    const images = artistData.images.map((filename, idx) => ({
      id: `${slug}-${idx + 1}`,
      url: `/images/artists/${folderName}/${filename}`,
      filename,
      title: filename.split('.')[0],
    }));
    const videos = artistData.videos.map((video) => ({
      id: video.id,
      url: `/videos/artists/${slug}/${video.filename}`,
      filename: video.filename,
      title: video.title,
      type: 'video'
    }));
    return NextResponse.json({
      images,
      videos,
      total: images.length + videos.length
    });
  } catch (error) {
    console.error('Error getting artist images:', error);
    return NextResponse.json({ error: 'Failed to get artist images' }, { status: 500 });
  }
}
