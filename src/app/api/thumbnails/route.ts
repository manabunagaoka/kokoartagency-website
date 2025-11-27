import { NextResponse } from 'next/server';

// Predefined thumbnail data to avoid filesystem operations
const THUMBNAIL_DATA = [
  { filename: 'AnnaHrachovec.gif', artistName: 'ANNA HRACHOVEC', slug: 'anna-hrachovec' },
  { filename: 'ChicoHayasaki.jpg', artistName: 'CHICO HAYASAKI', slug: 'chico-hayasaki' },
  { filename: 'ChrisLong.jpg', artistName: 'CHRIS LONG', slug: 'chris-long' },
  { filename: 'DominiqueCorbasson.jpg', artistName: 'DOMINIQUE CORBASSON', slug: 'dominique-corbasson' },
  { filename: 'EvelineTarnadjaja.jpg', artistName: 'EVELINE TARUNADJAJA', slug: 'eveline-tarunadjaja' },
  { filename: 'FrancoisAvril.jpeg', artistName: 'FRANÇOIS AVRIL', slug: 'francois-avril' },
  { filename: 'GiselaGoppel.jpg', artistName: 'GISELA GOPPEL', slug: 'gisela-goppel' },
  { filename: 'JeffreyFulvimari.jpeg', artistName: 'JEFFREY FULVIMARI', slug: 'jeffrey-fulvimari' },
  { filename: 'KanaKobayashi.jpg', artistName: 'KANA KOBAYASHI', slug: 'kana-kobayashi' },
  { filename: 'KenzoMinami.jpg', artistName: 'KENZO MINAMI', slug: 'kenzo-minami' },
  { filename: 'LisaGrue.gif', artistName: 'LISA GRUE', slug: 'lisa-grue' },
  { filename: 'LULU*.jpg', artistName: 'LULU*', slug: 'lulu' },
  { filename: 'MarcusOakley.jpg', artistName: 'MARCUS OAKLEY', slug: 'marcus-oakley' },
  { filename: 'MasakiRyo.png', artistName: 'MASAKI RYO', slug: 'masaki-ryo' },
  { filename: 'MasayukiOgisu.JPG', artistName: 'MASAYUKI OGISU', slug: 'masayuki-ogisu' },
  { filename: 'Miho_S.png', artistName: 'MIHO S', slug: 'miho-s' },
  { filename: 'StinaPersson.jpg', artistName: 'STINA PERSSON', slug: 'stina-persson' },
  { filename: 'SUPERDEUX.png', artistName: 'SUPERDEUX', slug: 'superdeux' },
  { filename: 'TinaBerning.jpg', artistName: 'TINA BERNING', slug: 'tina-berning' },
  { filename: 'TOMOTO.jpg', artistName: 'TOMOTO', slug: 'tomoto' }
];

export async function GET() {
  try {
    // Return predefined thumbnail data instead of reading filesystem
    const thumbnails = THUMBNAIL_DATA.map(item => ({
      id: item.filename.split('.')[0],
      name: item.artistName,
      slug: item.slug,
      thumbnail: `/thumbnails/${item.filename}`,
      filename: item.filename
    }));

    return NextResponse.json({
      thumbnails,
      total: thumbnails.length
    });

  } catch (error) {
    console.error('Error getting thumbnail data:', error);
    return NextResponse.json({ error: 'Failed to get thumbnail data' }, { status: 500 });
  }
}
