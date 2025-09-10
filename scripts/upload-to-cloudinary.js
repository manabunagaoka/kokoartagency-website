const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('🔑 Cloudinary Config:');
console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret length:', process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET.length : 'Missing');

const ARTIST_FOLDERS = {
  'anna-hrachovec': 'AnnaHrachovec',
  'chico-hayasaki': 'ChicoHayasaki',
  'chris-long': 'ChrisLong',
  'dominique-corbasson': 'DominiqueCorbasson',
  'eveline-tarunadjaja': 'EverlineTarunadjaja',
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

async function uploadArtistImages() {
  console.log('🚀 Starting Cloudinary upload process...');
  
  const uploadResults = {};
  
  for (const [artistSlug, folderName] of Object.entries(ARTIST_FOLDERS)) {
    console.log(`\n📁 Processing ${artistSlug} (${folderName})`);
    
    const artistDir = path.join(path.dirname(__dirname), 'public', 'images', 'artists', folderName);
    
    if (!fs.existsSync(artistDir)) {
      console.log(`⚠️ Directory not found: ${artistDir}`);
      continue;
    }
    
    const files = fs.readdirSync(artistDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file) && 
      !file.startsWith('.') && 
      file !== 'README.md'
    );
    
    console.log(`   Found ${imageFiles.length} images`);
    uploadResults[artistSlug] = [];
    
    for (let i = 0; i < Math.min(imageFiles.length, 20); i++) {
      const filename = imageFiles[i];
      const filePath = path.join(artistDir, filename);
      
      try {
        console.log(`   📤 Uploading ${i + 1}/${imageFiles.length}: ${filename}`);
        
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `koko-art-agency/artists/${artistSlug}`,
          public_id: filename.replace(/\.[^/.]+$/, ""), // Remove file extension
          resource_type: 'auto',
          transformation: [
            { width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' }
          ]
        });
        
        uploadResults[artistSlug].push({
          filename: filename,
          cloudinary_url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height
        });
        
        console.log(`   ✅ Uploaded: ${result.public_id}`);
        
      } catch (error) {
        console.error(`   ❌ Failed to upload ${filename}:`, error.message);
      }
    }
  }
  
  // Save results to JSON file
  const outputPath = path.join(__dirname, 'cloudinary-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(uploadResults, null, 2));
  console.log(`\n💾 Upload results saved to: ${outputPath}`);
  
  return uploadResults;
}

// Run the upload process
if (require.main === module) {
  uploadArtistImages()
    .then(() => {
      console.log('\n🎉 Upload process completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Upload process failed:', error);
      process.exit(1);
    });
}

module.exports = { uploadArtistImages };
