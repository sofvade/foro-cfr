'use client';

import { useMemo, useState } from 'react';

type Uni = {
  id: string;
  name: string;
  slug: string;
  city?: string;
  avg?: number;
  votes?: number;
};

type Review = {
  id: string;
  uniId: string;
  user: string;
  rating: number;
  comment?: string;
  createdAt: string;
};

// Datos demo (puedes quitarlos cuando conectes a BD/API)
const seed: Uni[] = [
  { id: 'upm', name: 'Universidad Politécnica de Madrid', slug: 'upm', city: 'Madrid', avg: 4.4, votes: 85 },
  { id: 'ub', name: 'Universitat de Barcelona', slug: 'ub', city: 'Barcelona', avg: 4.2, votes: 120 },
  { id: 'uam', name: 'Universidad Autónoma de Madrid', slug: 'uam', city: 'Madrid', avg: 4.1, votes: 75 },
];

export default function UniversitiesDemoClient({ initial = seed }: { initial?: Uni[] }) {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<'top' | 'name'>('top');
  const [list, setList] = useState<Uni[]>(initial);
  const [reviews, setReviews] = useState<Review[]>([]);

  const filtered = useMemo(() => {
    const base = list.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
    if (order === 'name') return [...base].sort((a, b) => a.name.localeCompare(b.name));
    return [...base].sort((a, b) => (b.avg ?? 0) - (a.avg ?? 0));
  }, [list, query, order]);

  function addReview(uniId: string, rating: number, comment: string) {
    const review: Review = {
      id: crypto.randomUUID(),
      uniId,
      user: 'Anónimo',
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [review, ...prev]);
    setList((prev) =>
      prev.map((u) => {
        if (u.id !== uniId) return u;
        const votes = (u.votes ?? 0) + 1;
        const avg = (((u.avg ?? 0) * (votes - 1)) + rating) / votes;
        return { ...u, votes, avg: Number(avg.toFixed(2)) };
      }),
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          className="border rounded-lg px-3 py-2 min-w-[220px]"
          placeholder="Buscar universidad…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2"
          value={order}
          onChange={(e) => setOrder(e.target.value as 'top' | 'name')}
        >
          <option value="top">Mejor valoradas</option>
          <option value="name">Nombre (A–Z)</option>
        </select>
      </div>

      <ol className="space-y-3">
        {filtered.map((u, idx) => (
          <li key={u.id} className="border rounded-xl p-4">
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <span className="text-xs text-gray-500">#{idx + 1}</span>
                <h3 className="font-semibold">{u.name}</h3>
                {u.city ? <p className="text-sm text-gray-500">{u.city}</p> : null}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{(u.avg ?? 0).toFixed(2)}</p>
                <p className="text-xs text-gray-500">{u.votes ?? 0} votos</p>
              </div>
            </div>

            <ReviewForm
              onSubmit={(rating, comment) => addReview(u.id, rating, comment)}
            />

            <div className="mt-3 space-y-2">
              {reviews
                .filter((r) => r.uniId === u.id)
                .slice(0, 3)
                .map((r) => (
                  <div key={r.id} className="text-sm text-gray-700">
                    <span className="mr-2">
                      {'★'.repeat(r.rating)}
                      {'☆'.repeat(5 - r.rating)}
                    </span>
                    {r.comment}
                  </div>
                ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ReviewForm({ onSubmit }: { onSubmit: (rating: number, comment: string) => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return;
    onSubmit(rating, comment.trim());
    setRating(0);
    setComment('');
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-wrap items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} estrellas`}>
            <span className={n <= rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
          </button>
        ))}
      </div>
      <input
        className="flex-1 min-w-[180px] border rounded-lg px-3 py-1"
        placeholder="Escribe un comentario (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="px-3 py-1 rounded-lg bg-black text-white disabled:opacity-40"
        disabled={!rating}
      >
        Enviar
      </button>
    </form>
  );
}

