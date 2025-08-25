import UniversitiesDemoClient from '@/components/universidades/UniversitiesDemoClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Universidades de España</h1>
      <p className="text-gray-600">
        Explora el ranking, filtra por área, y deja tu reseña.
      </p>
      <UniversitiesDemoClient />
    </main>
  );
}
import UniversitiesDemoClient from '@/components/universidades/UniversitiesDemoClient';

export const dynamic = 'force-dynamic';

export default function UniversidadesPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Ranking de Universidades</h1>
      <p className="text-gray-600">Explora, filtra y deja tu reseña.</p>
      <UniversitiesDemoClient />
    </main>
  );
}
