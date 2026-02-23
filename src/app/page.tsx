import ArtworkSlider from '@/components/home/artwork-slider';
import FeaturedArtistSpotlight from '@/components/home/featured-artist-spotlight';
import MarcusOakleyRecentWorks from '@/components/home/marcus-oakley-recent-works';

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-12">
      <MarcusOakleyRecentWorks />
      <FeaturedArtistSpotlight />
      <ArtworkSlider />
    </div>
  );
}
