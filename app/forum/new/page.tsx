'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import slugify from '@/lib/slugify';

export default function NewThreadPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-serif text-3xl mb-4">Crear nuevo tema</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await fetch('/api/forum/threads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, slug: slugify(title) })
          });
          const data = await res.json();
          if (res.ok) router.push(`/forum/thread/${data.id}`);
          else alert(data.error || 'Error');
        }}
        className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="w-full border rounded p-2 min-h-[200px]" placeholder="Contenido" value={content} onChange={e=>setContent(e.target.value)} />
        <button className="bg-black text-white rounded p-2">Publicar</button>
      </form>
    </section>
  );
}
