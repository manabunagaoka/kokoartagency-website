import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Supported formats
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

export async function GET() {
  try {
    const slideDir = path.join(process.cwd(), 'public', 'slide');

    // Check if directory exists
    try {
      await fs.access(slideDir);
    } catch {
      return NextResponse.json({ error: 'Slide directory not found' }, { status: 404 });
    }

    // Read all files in the directory
    const files = await fs.readdir(slideDir);
    
    // Process files and extract artist names
    const slideItems = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext) || VIDEO_EXTENSIONS.includes(ext);
      })
      .map(file => {
        const ext = path.extname(file).toLowerCase();
        const artistName = path.basename(file, ext);
        const isVideo = VIDEO_EXTENSIONS.includes(ext);
        
        return {
          id: file,
          url: `/slide/${file}`,
          artistName,
          type: isVideo ? 'video' : 'image',
          filename: file
        };
      })
      .sort((a, b) => a.artistName.localeCompare(b.artistName));

    return NextResponse.json({
      slides: slideItems,
      total: slideItems.length
    });

  } catch (error) {
    console.error('Error reading slide files:', error);
    return NextResponse.json({ error: 'Failed to read slide files' }, { status: 500 });
  }
}
