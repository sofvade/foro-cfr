import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { content } = await req.json();
  if (!content) return new Response(JSON.stringify({ error: 'Contenido requerido' }), { status: 400 });
  const author = await prisma.user.findFirst();
  const c = await prisma.comment.create({ data: { content, threadId: params.id, authorId: author?.id! } });
  return new Response(JSON.stringify({ id: c.id }), { status: 201 });
}
