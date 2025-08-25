import { prisma } from '@/lib/prisma';

export async function GET() {
  const cats = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  return new Response(JSON.stringify(cats), { headers: { 'Content-Type': 'application/json' } });
}
