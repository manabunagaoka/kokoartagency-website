require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkUploadedImages() {
  try {
    console.log('🔍 Checking uploaded images on Cloudinary...\n');
    
    // Get all images from the koko-art-agency folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'koko-art-agency/artists/',
      max_results: 500
    });

    console.log(`📊 Total uploaded images: ${result.resources.length}\n`);

    // Group by artist
    const artistCounts = {};
    result.resources.forEach(resource => {
      const pathParts = resource.public_id.split('/');
      if (pathParts.length >= 3) {
        const artist = pathParts[2]; // koko-art-agency/artists/[artist-name]/image
        artistCounts[artist] = (artistCounts[artist] || 0) + 1;
      }
    });

    // Display counts by artist
    console.log('📁 Images uploaded by artist:');
    Object.entries(artistCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([artist, count]) => {
        console.log(`   ${artist}: ${count} images`);
      });

    console.log(`\n✅ Upload progress: ${result.resources.length} images uploaded to Cloudinary`);
    
  } catch (error) {
    console.error('❌ Error checking Cloudinary:', error);
  }
}

checkUploadedImages();
