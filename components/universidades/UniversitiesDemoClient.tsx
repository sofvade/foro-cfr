'use client';

import { useMemo, useState } from 'react';

type Uni = {
  id: string;
  name: string;
  slug: string;
  city: string;
  region: string;
  tags: string[];
  votes: number;
  avgRating: number;
};

type Review = {
  id: string;
  uniId: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const SEED_UNIS: Uni[] = [
  { id: 'upm', slug: 'upm', name: 'Universidad Politécnica de Madrid', city: 'Madrid', region: 'Comunidad de Madrid', tags: ['Ingenierías', 'Tecnología'], votes: 42, avgRating: 4.4 },
  { id: 'ucm', slug: 'ucm', name: 'Universidad Complutense de Madrid', city: 'Madrid', region: 'Comunidad de Madrid', tags: ['Ciencias', 'Artes'], votes: 58, avgRating: 4.1 },
  { id: 'upc', slug: 'upc', name: 'Universitat Politècnica de Catalunya', city: 'Barcelona', region: 'Cataluña', tags: ['Ingenierías', 'Arquitectura'], votes: 37, avgRating: 4.3 },
  { id: 'ub',  slug: 'ub',  name: 'Universitat de Barcelona', city: 'Barcelona', region: 'Cataluña', tags: ['Salud', 'Ciencias'], votes: 65, avgRating: 4.2 },
  { id: 'us',  slug: 'us',  name: 'Universidad de Sevilla', city: 'Sevilla', region: 'Andalucía', tags: ['Humanidades', 'Tecnología'], votes: 23, avgRating: 3.9 },
  { id: 'uva', slug: 'uva', name: 'Universidad de Valladolid', city: 'Valladolid', region: 'Castilla y León', tags: ['Educación', 'Humanidades'], votes: 12, avgRating: 4.0 },
];

function Stars({ value }: { value: number }) {
  const filled = Math.round(value);
  return (
    <span aria-label={`Valoración ${value.toFixed(1)} de 5`} className="font-medium">
      {'★'.repeat(filled)}
      <span className="text-gray-300">{'★'.repeat(5 - filled)}</span>
      <span className="ml-1 text-sm text-gray-500">({value.toFixed(1)})</span>
    </span>
  );
}

export default function UniversitiesDemoClient() {
  const [unis, setUnis] = useState<Uni[]>(SEED_UNIS);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string>('');
  const [sort, setSort] = useState<'rating' | 'votes' | 'name'>('rating');

  const allTags = useMemo(
    () => Array.from(new Set(unis.flatMap(u => u.tags))).sort(),
    [unis]
  );

  const filtered = useMemo(() => {
    let data = [...unis];
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      data = data.filter(u =>
        u.name.toLowerCase().includes(t) ||
        u.city.toLowerCase().includes(t) ||
        u.region.toLowerCase().includes(t)
      );
    }
    if (tag) data = data.filter(u => u.tags.includes(tag));
    switch (sort) {
      case 'votes': data.sort((a, b) => b.votes - a.votes); break;
      case 'name': data.sort((a, b) => a.name.localeCompare(b.name)); break;
      default:     data.sort((a, b) => b.avgRating - a.avgRating);
    }
    return data;
  }, [unis, q, tag, sort]);

  function addReview(uniId: string, rating: number, comment: string, user = 'Anónimo') {
    if (!rating) return;
    setReviews(prev => [
      ...prev,
      { id: crypto.randomUUID(), uniId, rating, comment, user, createdAt: new Date().toISOString() }
    ]);
    setUnis(prev => prev.map(u => {
      if (u.id !== uniId) return u;
      const newVotes = u.votes + 1;
      const newAvg = (u.avgRating * u.votes + rating) / newVotes;
      return { ...u, votes: newVotes, avgRating: newAvg };
    }));
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Buscar por nombre, ciudad o región..."
          className="w-full md:max-w-sm rounded-lg border px-3 py-2"
        />
        <select value={tag} onChange={e => setTag(e.target.value)} className="rounded-lg border px-3 py-2">
          <option value="">Todas las áreas</option>
          {allTags.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value as any)} className="rounded-lg border px-3 py-2">
          <option value="rating">Ordenar: Mejor valoradas</option>
          <option value="votes">Ordenar: Más votadas</option>
          <option value="name">Ordenar: A–Z</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filtered.map(u => (
          <article key={u.id} className="rounded-xl border p-4 hover:shadow-sm transition">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{u.name}</h3>
                <p className="text-sm text-gray-600">{u.city} · {u.region}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {u.tags.map(t => (
                    <span key={t} className="rounded-full border px-2 py-0.5 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <Stars value={u.avgRating} />
                <div className="text-xs text-gray-500">{u.votes} votos</div>
              </div>
            </div>

            <ReviewQuickForm uni={u} onSubmit={addReview} />
            <ReviewList items={reviews.filter(r => r.uniId === u.id)} />
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500">No encontramos universidades con esos filtros.</p>
        )}
      </div>
    </section>
  );
}

function ReviewQuickForm({ uni, onSubmit }: { uni: Uni; onSubmit: (uniId: string, rating: number, comment: string) => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit(uni.id, rating, comment.trim()); setComment(''); }}
      className="mt-4 flex flex-col gap-2 md:flex-row md:items-center"
    >
      <label className="text-sm text-gray-600">Tu valoración:</label>
      <select value={rating} onChange={e => setRating(Number(e.target.value))} className="rounded-lg border px-2 py-1 w-28">
        {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} ★</option>)}
      </select>
      <input
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Escribe un comentario (opcional)"
        className="flex-1 rounded-lg border px-3 py-2"
      />
      <button className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">Enviar</button>
    </form>
  );
}

function ReviewList({ items }: { items: Review[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-3 space-y-2 border-t pt-3">
      {items.slice(-3).reverse().map(r => (
        <div key={r.id} className="text-sm">
          <span className="mr-2 font-medium">{r.user}</span>
          <span className="mr-2">
            {'★'.repeat(r.rating)}
            <span className="text-gray-300">{'★'.repeat(5 - r.rating)}</span>
          </span>
          <span className="text-gray-500">{new Date(r.createdAt).toLocaleString('es-ES')}</span>
          {r.comment && <p className="text-gray-700">{r.comment}</p>}
        </div>
      ))}
    </div>
  );
}

