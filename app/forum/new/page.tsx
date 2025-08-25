'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import slugify from '@/lib/slugify';

type Category = { id: string; name: string; slug: string };

export default function NewThreadPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [cats, setCats] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/forum/categories').then(async (r) => setCats(await r.json()));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/forum/threads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, slug: slugify(title), categoryId: categoryId || undefined }),
    });
    const data = await res.json();
    if (res.ok) router.push(`/forum/thread/${data.id}`);
    else alert(data.error || 'Error');
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-serif text-3xl mb-4">Crear nuevo tema</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="w-full border rounded p-2 min-h-[200px]" placeholder="Contenido" value={content} onChange={(e) => setContent(e.target.value)} />
        <div className="flex gap-3 items-center">
          <label className="text-sm text-gray-600">Categoría</label>
          <select className="border rounded p-2 text-sm" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">(Sin categoría)</option>
            {cats.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button className="bg-black text-white rounded p-2">Publicar</button>
      </form>
    </section>
  );
}
