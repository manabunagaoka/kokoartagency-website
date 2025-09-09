// Test script to verify our image loading system
import fs from 'fs';
import path from 'path';

const artistsDir = path.join(process.cwd(), 'public', 'images', 'artists');

console.log('Checking artists directories...\n');

// List all artist directories
const artistFolders = fs.readdirSync(artistsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${artistFolders.length} artist folders:`);
artistFolders.forEach(folder => console.log(`  - ${folder}`));

console.log('\nChecking AnnaHrachovec folder contents:');
const annaDir = path.join(artistsDir, 'AnnaHrachovec');
if (fs.existsSync(annaDir)) {
  const files = fs.readdirSync(annaDir);
  console.log(`  Found ${files.length} files:`);
  files.slice(0, 10).forEach(file => console.log(`    - ${file}`));
  if (files.length > 10) {
    console.log(`    ... and ${files.length - 10} more files`);
  }
} else {
  console.log('  Directory not found!');
}

console.log('\nDone!');
