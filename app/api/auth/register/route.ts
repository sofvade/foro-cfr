import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, name, password } = await req.json();
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email y contraseña requeridos' }), { status: 400 });
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return new Response(JSON.stringify({ error: 'El email ya existe' }), { status: 400 });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, name, passwordHash } });
  return new Response(JSON.stringify({ id: user.id }), { status: 201 });
}
