import ArtworkSlider from '@/components/home/artwork-slider';
import FeaturedArtistSpotlight from '@/components/home/featured-artist-spotlight';

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-12">
      <FeaturedArtistSpotlight />
      <ArtworkSlider />
    </div>
  );
}
