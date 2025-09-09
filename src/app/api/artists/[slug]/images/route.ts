import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getArtistFolderName } from '@/lib/utils';

// Supported image formats
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

// Smart sorting function that handles numeric prefixes properly
function smartSort(files: string[]): string[] {
  return files.sort((a, b) => {
    // Extract numeric prefix if it exists
    const aMatch = a.match(/^(\d+)/);
    const bMatch = b.match(/^(\d+)/);
    
    if (aMatch && bMatch) {
      // Both have numeric prefixes - sort by number
      const aNum = parseInt(aMatch[1]);
      const bNum = parseInt(bMatch[1]);
      if (aNum !== bNum) {
        return aNum - bNum;
      }
    } else if (aMatch && !bMatch) {
      // Only 'a' has numeric prefix - it comes first
      return -1;
    } else if (!aMatch && bMatch) {
      // Only 'b' has numeric prefix - it comes first
      return 1;
    }
    
    // Fallback to alphabetical sort
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });
}

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
    const artistDir = path.join(process.cwd(), 'public', 'images', 'artists', folderName);

    // Check if directory exists
    try {
      await fs.access(artistDir);
    } catch {
      return NextResponse.json({ error: 'Artist directory not found' }, { status: 404 });
    }

    // Read all files in the directory
    const files = await fs.readdir(artistDir);
    
    // Filter and categorize files
    const images: string[] = [];
    const videos: { url: string; thumbnail?: string; title: string; id: string }[] = [];
    const videoThumbnails = new Set<string>();

    // First pass - identify video thumbnails
    files.forEach(file => {
      if (file.includes('-thumbnail.') || file.includes('_thumbnail.')) {
        videoThumbnails.add(file);
      }
    });

    // Second pass - categorize files
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      
      if (file === 'thumbnail.jpg' || file === 'thumbnail.png') {
        // Skip main thumbnail
        return;
      }
      
      if (videoThumbnails.has(file)) {
        // Skip video thumbnails (they'll be associated with videos)
        return;
      }
      
      if (IMAGE_EXTENSIONS.includes(ext)) {
        images.push(`/images/artists/${folderName}/${file}`);
      } else if (VIDEO_EXTENSIONS.includes(ext)) {
        // Look for corresponding thumbnail
        const possibleThumbnails = [
          `${baseName}-thumbnail.jpg`,
          `${baseName}-thumbnail.png`,
          `${baseName}_thumbnail.jpg`,
          `${baseName}_thumbnail.png`
        ];
        
        const thumbnail = possibleThumbnails.find(t => files.includes(t));
        
        videos.push({
          id: baseName,
          url: `/images/artists/${folderName}/${file}`,
          thumbnail: thumbnail ? `/images/artists/${folderName}/${thumbnail}` : undefined,
          title: baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        });
      }
    });

    // Sort images using smart sort
    const sortedImageNames = smartSort(images.map(img => path.basename(img)));
    const sortedImages = sortedImageNames.map(name => `/images/artists/${folderName}/${name}`);

    // Sort videos by filename
    const sortedVideos = videos.sort((a, b) => smartSort([a.id, b.id])[0] === a.id ? -1 : 1);

    return NextResponse.json({
      artistName,
      folderName,
      thumbnail: `/images/artists/${folderName}/thumbnail.jpg`,
      images: sortedImages,
      videos: sortedVideos,
      totalImages: sortedImages.length,
      totalVideos: sortedVideos.length
    });

  } catch (error) {
    console.error('Error reading artist images:', error);
    return NextResponse.json({ error: 'Failed to read artist images' }, { status: 500 });
  }
}
