import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Supported image formats
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.JPG', '.JPEG', '.PNG'];

// Smart sorting function that handles various naming patterns
function smartSort(files: string[]): string[] {
  return files.sort((a, b) => {
    // Remove extensions for comparison
    const aName = path.basename(a, path.extname(a));
    const bName = path.basename(b, path.extname(b));
    
    return aName.localeCompare(bName, undefined, { 
      numeric: true, 
      sensitivity: 'base',
      ignorePunctuation: true 
    });
  });
}

// Format artist name: all caps, separate first and last names
function formatArtistName(filename: string): string {
  const name = path.basename(filename, path.extname(filename));
  
  // Handle special cases first
  if (name === 'LULU*') return 'LULU*';
  if (name === 'Miho_S') return 'MIHO S';
  if (name === 'SUPERDEUX') return 'SUPERDEUX';
  if (name === 'TOMOTO') return 'TOMOTO';
  
  // Convert to uppercase and handle camelCase separation
  const formatted = name
    // Insert space before uppercase letters that follow lowercase letters
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Handle special characters
    .replace(/_/g, ' ')
    // Convert to uppercase
    .toUpperCase();
  
  return formatted;
}

export async function GET() {
  try {
    const thumbnailsDir = path.join(process.cwd(), 'public', 'thumbnails');

    // Check if directory exists
    try {
      await fs.access(thumbnailsDir);
    } catch {
      return NextResponse.json({ error: 'Thumbnails directory not found' }, { status: 404 });
    }

    // Read all files in the directory
    const files = await fs.readdir(thumbnailsDir);
    
    // Filter and process image files
    const thumbnails = files
      .filter(file => {
        const ext = path.extname(file);
        return IMAGE_EXTENSIONS.includes(ext);
      })
      .map(file => {
        const ext = path.extname(file);
        const originalName = path.basename(file, ext);
        const formattedName = formatArtistName(file);
        
        // Map artist names to slugs for linking
        const slugMap: { [key: string]: string } = {
          'AnnaHrachovec': 'anna-hrachovec',
          'ChicoHayasaki': 'chico-hayasaki',
          'ChrisLong': 'chris-long',
          'DominiqueCorbasson': 'dominique-corbasson',
          'EvelineTarnadjaja': 'eveline-tarunadjaja',
          'FrançoisAvril': 'francois-avril',
          'GiselaGoppel': 'gisela-goppel',
          'JeffreyFulvimari': 'jeffrey-fulvimari',
          'KanaKobayashi': 'kana-kobayashi',
          'KenzoMinami': 'kenzo-minami',
          'LisaGrue': 'lisa-grue',
          'LULU*': 'lulu',
          'MarcusOakley': 'marcus-oakley',
          'MasakiRyo': 'masaki-ryo',
          'MasayukiOgisu': 'masayuki-ogisu',
          'Miho_S': 'miho-s',
          'StinaPersson': 'stina-persson',
          'SUPERDEUX': 'superdeux',
          'TinaBerning': 'tina-berning',
          'TOMOTO': 'tomoto'
        };

        return {
          id: originalName,
          name: formattedName,
          slug: slugMap[originalName] || originalName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          thumbnail: `/thumbnails/${file}`,
          filename: file
        };
      });

    // Sort thumbnails
    const sortedThumbnails = smartSort(thumbnails.map(t => t.filename))
      .map(filename => thumbnails.find(t => t.filename === filename)!)
      .filter(Boolean);

    return NextResponse.json({
      thumbnails: sortedThumbnails,
      total: sortedThumbnails.length
    });

  } catch (error) {
    console.error('Error reading thumbnail files:', error);
    return NextResponse.json({ error: 'Failed to read thumbnail files' }, { status: 500 });
  }
}
