# Artist Images Upload Guide

## Simple Folder Structure
For each artist, create a folder with their name and put ALL media files directly in that folder:

```
public/images/artists/
├── AnnaHrachovec/
│   ├── thumbnail.jpg          # Main artist thumbnail (400x400px recommended)
│   ├── artwork-1.jpg          # Individual artworks  
│   ├── artwork-2.png
│   ├── sculpture-detail.jpg
│   ├── process-video.mp4      # Videos go here too
│   ├── process-video-thumbnail.jpg  # Video thumbnails
│   ├── animation-loop.gif     # GIFs and animations
│   └── installation-view.jpg
├── ChicoHayasaki/
│   ├── thumbnail.jpg
│   ├── artwork-1.jpg
│   ├── artwork-2.png
│   ├── painting-series.gif
│   └── ...
└── [artist-name]/
    ├── thumbnail.jpg
    ├── artwork-1.jpg
    ├── video-name.mp4
    ├── video-name-thumbnail.jpg
    └── ...
```

## File Naming Conventions

### Thumbnails
- `thumbnail.jpg` - Main artist profile image (square, 400x400px+)

### Artworks & Media
- `artwork-1.jpg`, `artwork-2.png`, `sculpture-detail.jpg`, etc.
- Use descriptive names: `painting-blue-series.jpg`, `installation-view.png`
- Supported formats: JPG, PNG, GIF, WebP

### Videos
- `process-video.mp4`, `interview.mp4`, etc.
- `process-video-thumbnail.jpg` - Video thumbnail images (400x300px)

### Animations
- `animation-loop.gif`, `process-demo.gif`, etc.
- Keep file sizes reasonable for web

## Artist Folder Names
- AnnaHrachovec
- ChicoHayasaki  
- ChrisLong
- DominiqueCorbasson
- EverlineTarunadjaja
- FrançoisAvril
- GiselaGoppel
- JeffreyFulvimari
- KanaKobayashi
- KenzoMinami
- LisaGrue
- LULU*
- MarcusOakley
- MasakiRyo
- MasayukiOgisu
- Miho_S
- StinaPersson
- Superdeux
- TinaBerning
- TOMOTO

## Upload Tips
1. Keep file sizes reasonable (under 2MB for web display)
2. Use descriptive filenames
3. Maintain consistent aspect ratios where possible
4. Consider WebP format for better compression
5. Always include a thumbnail.jpg for each artist

After uploading, the code will automatically detect and use your real images instead of placeholders!
