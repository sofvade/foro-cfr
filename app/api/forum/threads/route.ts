import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { title, content, slug, categoryId } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });

  // valida categoría si viene
  let catId: string | undefined = undefined;
  if (categoryId) {
    const cat = await prisma.category.findUnique({ where: { id: categoryId } });
    if (cat) catId = cat.id;
  }

  const t = await prisma.thread.create({
    data: {
      title,
      content,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      authorId: user.id,
      categoryId: catId,
    },
  });
  return NextResponse.json({ id: t.id }, { status: 201 });
}

export async function GET() {
  const threads = await prisma.thread.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(threads);
}
