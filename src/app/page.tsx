import FeaturedArtists from '@/components/home/featured-artists';
import ArtworkSlider from '@/components/home/artwork-slider';

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      <FeaturedArtists />
      <ArtworkSlider />
    </div>
  );
}
