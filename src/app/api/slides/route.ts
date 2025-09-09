import { NextResponse } from 'next/server';

// Predefined slide data to avoid filesystem operations
const SLIDE_DATA = [
  {
    id: 'anna-hrachovec',
    artistName: 'Anna Hrachovec',
    url: '/slide/Anna Hrachovec.mp4',
    type: 'video' as const
  },
  {
    id: 'gisela-goppel',
    artistName: 'Gisela Goppel',
    url: '/slide/Gisela Goppel.jpg',
    type: 'image' as const
  },
  {
    id: 'jeffrey-fulvimari',
    artistName: 'Jeffrey Fulvimari',
    url: '/slide/Jeffrey Fulvimari.jpg',
    type: 'image' as const
  },
  {
    id: 'marcus-oakley',
    artistName: 'Marcus Oakley',
    url: '/slide/Marcus Oakley.jpg',
    type: 'image' as const
  },
  {
    id: 'masaki-ryo',
    artistName: 'Masaki Ryo',
    url: '/slide/Masaki Ryo.jpg',
    type: 'image' as const
  },
  {
    id: 'stina-persson',
    artistName: 'Stina Persson',
    url: '/slide/Stina Persson.jpg',
    type: 'image' as const
  },
  {
    id: 'tina-berning',
    artistName: 'Tina Berning',
    url: '/slide/Tina Berning.png',
    type: 'image' as const
  },
  {
    id: 'tomoto',
    artistName: 'TOMOTO',
    url: '/slide/TOMOTO.jpg',
    type: 'image' as const
  }
];

export async function GET() {
  try {
    // Return predefined slide data instead of reading filesystem
    const slideItems = SLIDE_DATA.map(slide => ({
      id: slide.id,
      url: slide.url,
      artistName: slide.artistName,
      type: slide.type,
      filename: slide.url.split('/').pop() || ''
    }));

    return NextResponse.json({
      slides: slideItems,
      total: slideItems.length
    });

  } catch (error) {
    console.error('Error getting slide data:', error);
    return NextResponse.json({ error: 'Failed to get slide data' }, { status: 500 });
  }
}
