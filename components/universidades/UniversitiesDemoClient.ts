model University {
  id        String               @id @default(cuid())
  name      String
  slug      String               @unique
  region    String?
  website   String?
  createdAt DateTime             @default(now())
  updatedAt DateTime             @updatedAt

  reviews   UniversityReview[]
}

model UniversityReview {
  id           String     @id @default(cuid())
  university   University @relation(fields: [universityId], references: [id], onDelete: Cascade)
  universityId String

  // Si tienes NextAuth con User, puedes relacionarlo. Si no, usa authorName opcional
  authorId     String?
  authorName   String?    // mostrará esto si no hay user

  rating       Int        // 1..5
  comment      String?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  @@index([universityId])
  @@index([rating])
}
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const universities = [
  { name: 'Universidad de Barcelona', slug: 'universidad-de-barcelona', region: 'Cataluña', website: 'https://www.ub.edu' },
  { name: 'Universidad Autónoma de Madrid', slug: 'universidad-autonoma-de-madrid', region: 'Madrid', website: 'https://www.uam.es' },
  { name: 'Universidad Complutense de Madrid', slug: 'universidad-complutense-de-madrid', region: 'Madrid', website: 'https://www.ucm.es' },
  { name: 'Universidad Pompeu Fabra', slug: 'universidad-pompeu-fabra', region: 'Cataluña', website: 'https://www.upf.edu' },
  { name: 'Universitat Politècnica de València', slug: 'universitat-politecnica-de-valencia', region: 'Comunidad Valenciana', website: 'https://www.upv.es' },
  { name: 'Universidade de Santiago de Compostela', slug: 'universidade-de-santiago-de-compostela', region: 'Galicia', website: 'https://www.usc.gal' },
];

async function main() {
  for (const u of universities) {
    await prisma.university.upsert({
      where: { slug: u.slug },
      update: {},
      create: u,
    });
  }
  console.log('Seed universities done.');
}

main().finally(() => prisma.$disconnect());
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/universities?q=...&region=...&sort=(rank|reviews|az)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();
  const region = (searchParams.get('region') || '').trim();
  const sort = (searchParams.get('sort') || 'rank') as 'rank'|'reviews'|'az';

  // Trae universidades filtradas
  const where = {
    AND: [
      q ? { name: { contains: q, mode: 'insensitive' as const } } : {},
      region ? { region: { contains: region, mode: 'insensitive' as const } } : {},
    ],
  };

  const universities = await prisma.university.findMany({
    where,
    orderBy: { name: 'asc' }, // orden base; luego ordenamos en memoria según ranking
  });

  // Calcula medias y conteos con groupBy
  const agg = await prisma.universityReview.groupBy({
    by: ['universityId'],
    _avg: { rating: true },
    _count: { rating: true },
    where: { universityId: { in: universities.map(u => u.id) } },
  });

  const mapAgg = new Map(agg.map(a => [a.universityId, { avg: a._avg.rating ?? 0, count: a._count.rating }]));

  const data = universities.map(u => {
    const a = mapAgg.get(u.id) || { avg: 0, count: 0 };
    return {
      id: u.id,
      name: u.name,
      slug: u.slug,
      region: u.region,
      website: u.website,
      averageRating: Number(a.avg?.toFixed(2) ?? 0),
      reviewsCount: a.count,
    };
  });

  // Orden final según sort
  const sorted = [...data].sort((a, b) => {
    if (sort === 'az') return a.name.localeCompare(b.name, 'es');
    if (sort === 'reviews') return b.reviewsCount - a.reviewsCount || b.averageRating - a.averageRating;
    // rank: primero por rating, luego por número de reseñas
    return b.averageRating - a.averageRating || b.reviewsCount - a.reviewsCount || a.name.localeCompare(b.name, 'es');
  });

  return NextResponse.json(sorted);
}
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Si usas NextAuth, descomenta estas 2 líneas y ajusta la ruta a tus authOptions
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const uni = await prisma.university.findUnique({ where: { slug: params.slug } });
  if (!uni) return NextResponse.json({ error: 'Universidad no encontrada' }, { status: 404 });

  const reviews = await prisma.universityReview.findMany({
    where: { universityId: uni.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  // Si quieres forzar login con NextAuth:
  // const session = await getServerSession(authOptions);
  // if (!session?.user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const uni = await prisma.university.findUnique({ where: { slug: params.slug } });
  if (!uni) return NextResponse.json({ error: 'Universidad no encontrada' }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const rating = Number(body?.rating ?? 0);
  const comment = (body?.comment || '').toString().slice(0, 1000);
  const authorName = (body?.authorName || '').toString().slice(0, 80);

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'rating debe ser 1..5' }, { status: 400 });
  }

  const created = await prisma.universityReview.create({
    data: {
      universityId: uni.id,
      rating: Math.round(rating),
      comment: comment || null,
      // authorId: session?.user?.id ?? null, // si tienes User
      authorName: authorName || null,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
'use client';

import { useEffect, useMemo, useState } from 'react';

type UniRow = {
  id: string;
  name: string;
  slug: string;
  region?: string | null;
  website?: string | null;
  averageRating: number;
  reviewsCount: number;
};

type Props = {
  initial: UniRow[];
};

function Stars({ value }: { value: number }) {
  const rounded = Math.round(value * 2) / 2; // medias estrellas si quieres
  return (
    <div className="text-yellow-500 text-sm" aria-label={`${value.toFixed(1)} de 5`}>
      {'★★★★★'.split('').map((s, i) => {
        const filled = i + 1 <= Math.floor(rounded);
        const half = !filled && i + 0.5 === rounded;
        return (
          <span key={i} className={filled ? '' : half ? 'opacity-80' : 'opacity-25'}>
            ★
          </span>
        );
      })}
      <span className="ml-1 text-gray-600">{value.toFixed(1)}</span>
    </div>
  );
}

export default function UniversityExplorerClient({ initial }: Props) {
  const [q, setQ] = useState('');
  const [region, setRegion] = useState('');
  const [sort, setSort] = useState<'rank' | 'reviews' | 'az'>('rank');
  const [rows, setRows] = useState<UniRow[]>(initial);
  const [loading, setLoading] = useState(false);

  const regions = useMemo(() => {
    const set = new Set(initial.map((u) => u.region).filter(Boolean) as string[]);
    return [''].concat([...set].sort((a, b) => a.localeCompare(b, 'es')));
  }, [initial]);

  async function fetchRows() {
    setLoading(true);
    const sp = new URLSearchParams();
    if (q.trim()) sp.set('q', q.trim());
    if (region) sp.set('region', region);
    sp.set('sort', sort);
    const res = await fetch(`/api/universities?${sp.toString()}`, { cache: 'no-store' });
    const data = await res.json();
    setRows(data);
    setLoading(false);
  }

  useEffect(() => {
    // aplica filtros cuando cambie algo (debounce liviano)
    const t = setTimeout(fetchRows, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, region, sort]);

  // Reseña: envío básico (sin login). Si quieres forzar login, añade authorName opcional o NextAuth
  async function submitReview(slug: string, rating: number, comment: string, authorName?: string) {
    await fetch(`/api/universities/${slug}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment, authorName }),
    });
    await fetchRows();
    alert('¡Gracias por tu reseña!');
  }

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar universidad…"
          className="border rounded-full px-4 py-2 text-sm"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border rounded-full px-3 py-2 text-sm"
        >
          {regions.map((r, i) => (
            <option key={i} value={r}>
              {r ? r : 'Todas las regiones'}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="border rounded-full px-3 py-2 text-sm"
        >
          <option value="rank">Ranking (mejor rating)</option>
          <option value="reviews">Más comentadas</option>
          <option value="az">A-Z</option>
        </select>
        {loading && <span className="text-gray-500 text-sm">Cargando…</span>}
      </div>

      {/* Tabla / cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((u) => (
          <div key={u.id} className="border rounded-2xl p-4 hover:shadow-sm transition">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg">{u.name}</h3>
                <p className="text-xs text-gray-500">
                  {u.region || '–'} · {u.website ? <a className="underline" href={u.website} target="_blank" rel="noreferrer">{u.website}</a> : 'Sin web'}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Stars value={u.averageRating || 0} />
                  <span className="text-xs text-gray-500">({u.reviewsCount} reseñas)</span>
                </div>
              </div>
              {/* Formulario mini de reseña */}
              <form
                className="text-right"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const fd = new FormData(form);
                  const rating = Number(fd.get('rating') || 0);
                  const comment = String(fd.get('comment') || '');
                  const authorName = String(fd.get('authorName') || '');
                  if (!rating) return alert('Elige una calificación (1 a 5).');
                  await submitReview(u.slug, rating, comment, authorName);
                  form.reset();
                }}
              >
                <select name="rating" className="border rounded px-2 py-1 text-sm">
                  <option value="">★ Calificar</option>
                  {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} ★</option>)}
                </select>
                <input
                  name="authorName"
                  placeholder="Tu nombre (opcional)"
                  className="border rounded px-2 py-1 text-sm ml-2"
                />
                <input
                  name="comment"
                  placeholder="Comentario (opcional)"
                  className="border rounded px-2 py-1 text-sm ml-2"
                />
                <button className="ml-2 px-3 py-1.5 text-sm rounded bg-black text-white">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-gray-600">No hay universidades con esos filtros.</p>
        )}
      </div>
    </div>
  );
}
import UniversityExplorerClient from '@/components/UniversityExplorerClient';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function UniversitiesPage() {
  // Carga inicial con ranking (sin filtros) para primera renderización
  const universities = await prisma.university.findMany({ orderBy: { name: 'asc' } });
  const agg = await prisma.universityReview.groupBy({
    by: ['universityId'],
    _avg: { rating: true },
    _count: { rating: true },
  });
  const mapAgg = new Map(agg.map(a => [a.universityId, { avg: a._avg.rating ?? 0, count: a._count.rating }]));

  const initial = universities.map(u => {
    const a = mapAgg.get(u.id) || { avg: 0, count: 0 };
    return {
      id: u.id,
      name: u.name,
      slug: u.slug,
      region: u.region,
      website: u.website,
      averageRating: Number(a.avg?.toFixed(2) ?? 0),
      reviewsCount: a.count,
    };
  }).sort((a,b) => b.averageRating - a.averageRating || b.reviewsCount - a.reviewsCount || a.name.localeCompare(b.name, 'es'));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Universidades de España</h1>
        <p className="text-gray-600 mt-2">
          Descubre, compara y opina sobre las universidades españolas. El ranking se basa en la media de calificaciones y el volumen de reseñas enviadas por la comunidad.
        </p>
      </header>

      <UniversityExplorerClient initial={initial} />
    </main>
  );
}
<Link href="/universidades" className="hover:underline">Universidades</Link>

