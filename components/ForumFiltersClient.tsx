'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Category = { id: string; name: string; slug: string };

export default function ForumFiltersClient({
  categories,
  q,
  cat,
}: {
  categories: Category[];
  q: string;
  cat: string;
}) {
  const router = useRouter();
  const [text, setText] = useState(q ?? '');

  // Navega usando typedRoutes: objeto { pathname, query }
  const applyFilters = (nextCat?: string) => {
    const sp = new URLSearchParams();
    const qTrim = text.trim();
    if (qTrim) sp.set('q', qTrim);
    if (nextCat) sp.set('cat', nextCat);

    const query = Object.fromEntries(sp.entries()) as Record<string, string>;
    router.push({ pathname: '/forum', query });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Buscar…"
          className="px-3 py-2 border rounded w-full"
        />
        <button
          onClick={() => applyFilters(cat)}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Buscar
        </button>
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <button
          onClick={() => {
            setText('');
            applyFilters(undefined);
          }}
          className={`px-3 py-1.5 rounded-full border text-sm ${
            !cat ? 'bg-black text-white' : 'hover:bg-gray-50'
          }`}
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
