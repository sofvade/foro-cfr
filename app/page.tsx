// Update the import path if the file is located at 'components/Home/FeaturedHero.tsx'
import FeaturedHero from '../components/home/FeaturedHero';
import StoryGrid from '../components/home/StoryGrid';
import QuickNav from '@/components/home/QuickNav';
import { FEATURED, RIGHT_COLUMN, LATEST } from '@/lib/home';

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Héroe estilo CFR */}
      <FeaturedHero featured={FEATURED} right={RIGHT_COLUMN} />

      {/* Accesos rápidos */}
      <QuickNav />

      {/* Últimos / destacados */}
      <StoryGrid
        title="Últimos contenidos"
        stories={LATEST}
        viewAllHref="/topics"
      />
    </main>
  );
}




