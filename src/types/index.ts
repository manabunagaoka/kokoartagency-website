export interface ArtworkImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
}

export interface ArtworkVideo {
  id: string;
  url: string;
  thumbnail: string;
  title?: string;
  duration?: number;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  thumbnail: string;
  images: ArtworkImage[];
  videos?: ArtworkVideo[];
  website?: string;
  instagram?: string;
  facebook?: string;
  pinterest?: string;
  blogspot?: string;
  featured: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address?: string;
  hours?: string;
}
