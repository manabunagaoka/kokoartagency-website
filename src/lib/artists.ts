import { artists } from './data'
import { Artist } from '@/types'

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find(artist => artist.slug === slug);
}
