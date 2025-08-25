import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ForumPage() {
  const threads = await prisma.thread.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-serif text-3xl">Foro</h1>
        <Link href="/forum/new" className="px-4 py-2 rounded-full bg-black text-white text-sm">Nuevo tema</Link>
      </div>
      <div className="grid gap-3">
        {threads.length === 0 && <p className="text-gray-600">Aún no hay hilos. ¡Sé la primera en publicar!</p>}
        {threads.map(t => (
          <a key={t.id} href={`/forum/thread/${t.id}`} className="block p-4 border rounded-xl hover:bg-gray-50">
            <h4 className="font-serif text-lg">{t.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{t.content}</p>
            <p className="text-xs text-gray-500 mt-2">por {t.author?.name ?? 'Anónimo'} · {new Date(t.createdAt).toLocaleString('es-ES')}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
