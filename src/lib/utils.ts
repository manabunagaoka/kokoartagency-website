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
