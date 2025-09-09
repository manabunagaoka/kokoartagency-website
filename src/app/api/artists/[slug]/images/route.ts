import { NextRequest, NextResponse } from 'next/server';
import { getArtistFolderName } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    
    // Convert slug back to artist name to get folder name
    const artistNames: { [key: string]: string } = {
      'anna-hrachovec': 'ANNA HRACHOVEC',
      'chico-hayasaki': 'CHICO HAYASAKI',
      'chris-long': 'CHRIS LONG',
      'dominique-corbasson': 'DOMINIQUE CORBASSON',
      'eveline-tarunadjaja': 'EVELINE TARUNADJAJA',
      'francois-avril': 'FRANÇOIS AVRIL',
      'gisela-goppel': 'GISELA GOPPEL',
      'jeffrey-fulvimari': 'JEFFREY FULVIMARI',
      'kana-kobayashi': 'KANA KOBAYASHI',
      'kenzo-minami': 'KENZO MINAMI',
      'lisa-grue': 'LISA GRUE',
      'lulu': 'LULU*',
      'marcus-oakley': 'MARCUS OAKLEY',
      'masaki-ryo': 'MASAKI RYO',
      'masayuki-ogisu': 'MASAYUKI OGISU',
      'miho-s': 'Miho_S',
      'stina-persson': 'STINA PERSSON',
      'superdeux': 'SUPERDEUX',
      'tina-berning': 'TINA BERNING',
      'tomoto': 'TOMOTO'
    };

    const artistName = artistNames[slug];
    if (!artistName) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    const folderName = getArtistFolderName(artistName);
    
    // Generate a reasonable set of image URLs without filesystem access
    // This uses a pattern-based approach to generate likely image paths
    const images: string[] = [];
    const videos: Array<{
      id: string;
      url: string;
      thumbnail: string;
      title: string;
      duration: number;
    }> = [];
    
    // Generate image URLs based on common patterns (1-20 numbered files)
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    
    for (let i = 1; i <= 20; i++) {
      for (const ext of imageExtensions) {
        images.push(`/images/artists/${folderName}/${i}.${ext}`);
        // Also try with zero-padding
        if (i < 10) {
          images.push(`/images/artists/${folderName}/0${i}.${ext}`);
        }
      }
    }
    
    // Add some video entries if this is a known video artist
    if (slug === 'stina-persson' || slug === 'anna-hrachovec') {
      videos.push({
        id: 'video-1',
        url: `/images/artists/${folderName}/video1.mp4`,
        thumbnail: `/images/artists/${folderName}/video1-thumb.jpg`,
        title: 'Creative Process',
        duration: 120
      });
    }

    return NextResponse.json({
      artistName,
      folderName,
      thumbnail: `/images/artists/${folderName}/thumbnail.jpg`,
      images: images.slice(0, 30), // Limit to first 30 possible images
      videos,
      totalImages: 30,
      totalVideos: videos.length
    });

  } catch (error) {
    console.error('Error getting artist images:', error);
    return NextResponse.json({ error: 'Failed to get artist images' }, { status: 500 });
  }
}
