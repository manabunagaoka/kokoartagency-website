import { CldImage } from 'next-cloudinary';
import Image from 'next/image';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  isCloudinaryUrl?: boolean;
}

export default function CloudinaryImage({
  src,
  alt,
  width = 600,
  height = 600,
  className = "",
  priority = false,
  isCloudinaryUrl = false
}: CloudinaryImageProps) {
  // If it's already a Cloudinary URL, use it directly
  if (isCloudinaryUrl || src.includes('cloudinary.com')) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }
  
  // For Cloudinary public IDs, use CldImage for optimization
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      crop="limit"
      quality="auto:good"
    />
  );
}
