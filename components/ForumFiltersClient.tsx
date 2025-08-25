'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Category = { id: string; name: string; slug: string };

export default function ForumFiltersClient({
  categories,
  q,
  cat,
}: { categories: Category[]; q: string; cat: string }) {
  const router = useRouter();
  const [text, setText] = useState(q);

  const applyFilters = (nextCat: string) => {
    const sp = new URLSearchParams();
    if (text) sp.set('q', text);
    if (nextCat) sp.set('cat', nextCat);
    const href = sp.toString() ? `/forum?${sp.toString()}` : '/forum';
    router.push(href);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Buscar…"
          className="border px-3 py-2 rounded w-full"
        />
        <button onClick={() => applyFilters(cat)} className="border px-4 py-2 rounded">
          Buscar
        </button>
      </div>
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
            className={`px-3 py-1.5 rounded-full border text-sm ${cat === c.slug ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
