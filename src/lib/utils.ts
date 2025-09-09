import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility for responsive image sizing
export function getResponsiveImageSizes(width: number, height: number) {
  const aspectRatio = width / height;
  
  if (aspectRatio > 1.5) return 'landscape';
  if (aspectRatio < 0.75) return 'portrait';
  return 'square';
}

// Generate placeholder image URLs for development
export function generatePlaceholderImage(width: number, height: number, text?: string) {
  const encodedText = encodeURIComponent(text || 'Artwork');
  return `https://placehold.co/${width}x${height}/f8f9fa/6c757d?text=${encodedText}`;
}

// Convert artist name to folder name (exactly as provided)
export function getArtistFolderName(artistName: string): string {
  const folderMap: { [key: string]: string } = {
    'ANNA HRACHOVEC': 'AnnaHrachovec',
    'CHICO HAYASAKI': 'ChicoHayasaki',
    'CHRIS LONG': 'ChrisLong',
    'DOMINIQUE CORBASSON': 'DominiqueCorbasson',
    'EVELINE TARUNADJAJA': 'EverlineTarunadjaja',
    'FRANÇOIS AVRIL': 'FrançoisAvril',
    'GISELA GOPPEL': 'GiselaGoppel',
    'JEFFREY FULVIMARI': 'JeffreyFulvimari',
    'KANA KOBAYASHI': 'KanaKobayashi',
    'KENZO MINAMI': 'KenzoMinami',
    'LISA GRUE': 'LisaGrue',
    'LULU*': 'LULU*',
    'MARCUS OAKLEY': 'MarcusOakley',
    'MASAKI RYO': 'MasakiRyo',
    'MASAYUKI OGISU': 'MasayukiOgisu',
    'Miho_S': 'Miho_S',
    'STINA PERSSON': 'StinaPersson',
    'SUPERDEUX': 'Superdeux',
    'TINA BERNING': 'TinaBerning',
    'TOMOTO': 'TOMOTO'
  };
  
  return folderMap[artistName] || artistName.replace(/\s+/g, '');
}

// Get artist thumbnail image
export function getArtistThumbnail(artistName: string) {
  const folderName = getArtistFolderName(artistName);
  return `/images/artists/${folderName}/thumbnail.jpg`;
}

// Get artwork image (simplified - all in one folder)
export function getArtworkImage(artistName: string, index: number) {
  const folderName = getArtistFolderName(artistName);
  return `/images/artists/${folderName}/artwork-${index + 1}.jpg`;
}

// Get video thumbnail (simplified - all in one folder)
export function getVideoThumbnail(artistName: string, videoName: string) {
  const folderName = getArtistFolderName(artistName);
  return `/images/artists/${folderName}/${videoName}-thumbnail.jpg`;
}

// Get video file (simplified - all in one folder)
export function getVideoFile(artistName: string, videoName: string) {
  const folderName = getArtistFolderName(artistName);
  return `/images/artists/${folderName}/${videoName}.mp4`;
}
