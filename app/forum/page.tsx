import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function ForumPage({ searchParams }: { searchParams: { q?: string; cat?: string } }) {
  const q = (searchParams.q || '').trim();
  const cat = (searchParams.cat || '').trim();

  const [categories, threads] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.thread.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { title: { contains: q, mode: 'insensitive' } },
                  { content: { contains: q, mode: 'insensitive' } },
                ],
              }
            : {},
          cat ? { category: { slug: cat } } : {},
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: { author: true, category: true },
    }),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-serif text-3xl">Foro</h1>
        <Link href="/forum/new" className="px-4 py-2 rounded-full bg-black text-white text-sm">
          Nuevo tema
        </Link>
      </div>

      <div className="mb-6 p-4 border rounded-xl bg-gray-50 text-sm">
        <p className="font-semibold">Normas rápidas</p>
        <ul className="list-disc ml-5 mt-1 space-y-1">
          <li>Respeto absoluto. Nada de ataques personales o discriminación.</li>
          <li>Comparte experiencias reales y evita datos personales sensibles.</li>
          <li>Títulos claros y sin spam. Fuentes cuando afirmes hechos.</li>
        </ul>
      </div>

      <Suspense>
        <ForumFilters categories={categories} q={q} cat={cat} />
      </Suspense>

      <div className="grid gap-3 mt-4">
        {threads.length === 0 && <p className="text-gray-600">No hay resultados con esos filtros.</p>}
        {threads.map((t) => (
          <a key={t.id} href={`/forum/thread/${t.id}`} className="block p-4 border rounded-xl hover:bg-gray-50">
            <h4 className="font-serif text-lg">{t.title}</h4>
            <p className="text-xs text-gray-500 mt-1">
              {t.category ? `[${t.category.name}] · ` : null}por {t.author?.name ?? 'Anónimo'} ·{' '}
              {new Date(t.createdAt).toLocaleString('es-ES')}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{t.content}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function ForumFilters({ categories, q, cat }: { categories: any[]; q: string; cat: string }) {
  return <ClientFilters categories={categories} q={q} cat={cat} />;
}

'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ClientFilters({ categories, q, cat }: { categories: any[]; q: string; cat: string }) {
  const router = useRouter();
  const [text, setText] = useState(q);

  function applyFilters(nextCat: string) {
    const sp = new URLSearchParams();
    if (text.trim()) sp.set('q', text.trim());
    if (nextCat) sp.set('cat', nextCat);
    router.push('/forum' + (sp.toString() ? `?${sp.toString()}` : ''));
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && applyFilters(cat)}
        className="border rounded-full px-4 py-2 text-sm"
        placeholder="Buscar por título o contenido..."
      />
      <button className="border rounded-full px-4 py-2 text-sm" onClick={() => applyFilters(cat)}>
        Buscar
      </button>

      <div className="flex gap-2 items-center flex-wrap">
        <button
          onClick={() => applyFilters('')}
          className={`px-3 py-1.5 rounded-full border text-sm ${!cat ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => applyFilters(c.slug)}
            className={`px-3 py-1.5 rounded-full border text-sm ${
              cat === c.slug ? 'bg-black text-white' : 'hover:bg-gray-50'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
