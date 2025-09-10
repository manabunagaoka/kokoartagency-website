const fs = require('fs');
const path = require('path');

// Function to get artist folder name mapping
function getArtistFolderName(artistName) {
  const folderMap = {
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

// Artist mapping
const artists = {
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

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const videoExtensions = ['.mp4', '.webm', '.mov'];

console.log('const ARTIST_IMAGE_DATA: { [key: string]: { images: string[], videos: { id: string, filename: string, title: string }[] } } = {');

for (const [slug, artistName] of Object.entries(artists)) {
  const folderName = getArtistFolderName(artistName);
  const artistDir = path.join(process.cwd(), 'public', 'images', 'artists', folderName);
  
  try {
    const files = fs.readdirSync(artistDir);
    const images = [];
    const videos = [];
    
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        images.push(file);
      } else if (videoExtensions.includes(ext)) {
        const baseName = path.basename(file, ext);
        videos.push({
          id: `${slug}-${baseName}`,
          filename: file,
          title: baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        });
      }
    });
    
    // Sort images numerically if they have numeric prefixes
    images.sort((a, b) => {
      const aNum = parseInt(a.match(/^(\d+)/)?.[1] || '999');
      const bNum = parseInt(b.match(/^(\d+)/)?.[1] || '999');
      return aNum - bNum;
    });
    
    console.log(`  '${slug}': {`);
    console.log(`    images: [${images.map(img => `'${img}'`).join(', ')}],`);
    console.log(`    videos: [${videos.map(v => `{ id: '${v.id}', filename: '${v.filename}', title: '${v.title}' }`).join(', ')}]`);
    console.log(`  },`);
    
  } catch (error) {
    console.log(`  '${slug}': { images: [], videos: [] }, // Error reading directory`);
  }
}

console.log('};');
