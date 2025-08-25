'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Category = { id: string; name: string; slug: string };

export default function ForumFiltersClient({
  categories, q, cat
}: { categories: Category[]; q: string; cat: string }) {
  const router = useRouter();
  const [text, setText] = useState(q);

  function applyFilters(nextCat: string) {
    const sp = new URLSearchParams();
    const t = text.trim();
    if (t) sp.set('q', t);
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
