import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const thread = await prisma.thread.findUnique({
    where: { id: params.id },
    include: { author: true, comments: { orderBy: { createdAt: 'asc' }, include: { author: true } } }
  });
  if (!thread) return <section className="mx-auto max-w-3xl px-4 py-10"><p>No encontrado</p></section>;

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl">{thread.title}</h1>
      <p className="text-sm text-gray-500">por {thread.author?.name ?? 'Anónimo'} · {new Date(thread.createdAt).toLocaleString('es-ES')}</p>
      <article className="container-prose mt-6">
        <p>{thread.content}</p>
      </article>
      <hr className="my-8"/>
      <h2 className="font-serif text-2xl mb-3">Respuestas</h2>
      <Comments threadId={thread.id} comments={thread.comments} />
    </section>
  );
}

function Comments({ threadId, comments }: { threadId: string; comments: any[] }) {
  return (
    <div className="space-y-4">
      <NewComment threadId={threadId} />
      {comments.length === 0 && <p className="text-gray-600">Sé la primera persona en responder.</p>}
      {comments.map(c => (
        <div key={c.id} className="p-4 border rounded-xl">
          <p className="text-sm text-gray-500 mb-1">por {c.author?.name ?? 'Anónimo'} · {new Date(c.createdAt).toLocaleString('es-ES')}</p>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  );
}

function NewComment({ threadId }: { threadId: string }) {
  async function post(formData: FormData) {
    "use server";
    const content = formData.get('content')?.toString() || '';
    if (content.trim().length < 2) return;
    await fetch(`${process.env.NEXTAUTH_URL || ''}/api/forum/threads/${threadId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
  }

  return (
    <form action={post} className="space-y-3">
      <textarea name="content" className="w-full border rounded p-2 min-h-[120px]" placeholder="Escribe tu respuesta..." />
      <button className="bg-black text-white rounded p-2">Responder</button>
    </form>
  );
}
