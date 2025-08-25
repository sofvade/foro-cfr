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

