require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('🔑 Cloudinary Config:');
console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret length:', process.env.CLOUDINARY_API_SECRET?.length || 0);

// Artist folder mapping
const ARTIST_FOLDERS = {
  "anna-hrachovec": "AnnaHrachovec",
  "chico-hayasaki": "ChicoHayasaki", 
  "chris-long": "ChrisLong",
  "dominique-corbasson": "DominiqueCorbasson",
  "eveline-tarunadjaja": "EverlineTarunadjaja",
  "francois-avril": "FrançoisAvril",
  "gisela-goppel": "GiselaGoppel",
  "jeffrey-fulvimari": "JeffreyFulvimari",
  "kana-kobayashi": "KanaKobayashi",
  "kenzo-minami": "KenzoMinami",
  "lisa-grue": "LisaGrue",
  "lulu": "LULU*",
  "marcus-oakley": "MarcusOakley",
  "masaki-ryo": "MasakiRyo",
  "masayuki-ogisu": "MasayukiOgisu",
  "miho-s": "Miho_S",
  "stina-persson": "StinaPersson",
  "superdeux": "Superdeux",
  "tina-berning": "TinaBerning",
  "tomoto": "TOMOTO"
};

async function getUploadedImages() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'koko-art-agency/artists/',
      max_results: 500
    });
    
    const uploaded = new Set();
    result.resources.forEach(resource => {
      const pathParts = resource.public_id.split('/');
      if (pathParts.length >= 4) {
        const artist = pathParts[2];
        const imageName = pathParts[3];
        uploaded.add(`${artist}/${imageName}`);
      }
    });
    
    return uploaded;
  } catch (error) {
    console.error('❌ Error fetching uploaded images:', error);
    return new Set();
  }
}

async function uploadRemainingImages() {
  console.log('🚀 Starting smart upload process...\n');
  
  const uploadedImages = await getUploadedImages();
  console.log(`📊 Found ${uploadedImages.size} already uploaded images\n`);
  
  let totalUploaded = 0;
  let totalSkipped = 0;
  
  for (const [artistSlug, folderName] of Object.entries(ARTIST_FOLDERS)) {
    console.log(`📁 Processing ${artistSlug} (${folderName})`);
    
    const artistPath = path.join(__dirname, '..', 'public', 'images', 'artists', folderName);
    
    if (!fs.existsSync(artistPath)) {
      console.log(`   ⚠️  Folder not found: ${artistPath}\n`);
      continue;
    }
    
    const files = fs.readdirSync(artistPath).filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    console.log(`   Found ${files.length} images`);
    
    let artistUploaded = 0;
    let artistSkipped = 0;
    
    for (let i = 0; i < files.length; i++) {
      const filename = files[i];
      const filenameParts = filename.split('.');
      const nameWithoutExtension = filenameParts.slice(0, -1).join('.');
      const checkKey = `${artistSlug}/${nameWithoutExtension}`;
      
      if (uploadedImages.has(checkKey)) {
        console.log(`   ⏭️  Skipping ${filename} (already uploaded)`);
        artistSkipped++;
        totalSkipped++;
        continue;
      }
      
      const filePath = path.join(artistPath, filename);
      const publicId = `koko-art-agency/artists/${artistSlug}/${nameWithoutExtension}`;
      
      try {
        console.log(`   📤 Uploading ${i + 1}/${files.length}: ${filename}`);
        
        const uploadOptions = {
          public_id: publicId,
          folder: '',
          resource_type: 'auto',
          overwrite: false
        };

        await cloudinary.uploader.upload(filePath, uploadOptions);
        console.log(`   ✅ Uploaded: ${publicId}`);
        artistUploaded++;
        totalUploaded++;
        
      } catch (error) {
        console.log(`   ❌ Failed to upload ${filename}:`, error.message);
      }
    }
    
    console.log(`   📊 ${artistSlug}: ${artistUploaded} uploaded, ${artistSkipped} skipped\n`);
  }
  
  console.log(`🏁 Upload complete!`);
  console.log(`📊 Total: ${totalUploaded} new uploads, ${totalSkipped} skipped`);
}

uploadRemainingImages().catch(console.error);
