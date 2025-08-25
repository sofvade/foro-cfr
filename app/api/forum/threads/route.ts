import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { title, content, slug } = await req.json();
  if (!title || !content) return new Response(JSON.stringify({ error: 'Faltan campos' }), { status: 400 });
  const author = await prisma.user.findFirst(); // simplificado: el primer usuario será autor si no hay sesión
  const t = await prisma.thread.create({
    data: { title, content, slug: slug || title.toLowerCase().replace(/\s+/g, '-') , authorId: author?.id! }
  });
  return new Response(JSON.stringify({ id: t.id }), { status: 201 });
}

export async function GET() {
  const threads = await prisma.thread.findMany({ orderBy: { createdAt: 'desc' }});
  return new Response(JSON.stringify(threads));
}
