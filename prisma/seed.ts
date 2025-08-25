import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('demo1234', 10);
  const sof = await prisma.user.upsert({
    where: { email: 'sofia@example.com' },
    update: {},
    create: { email: 'sofia@example.com', name: 'Sofía', passwordHash }
  });

  const t1 = await prisma.thread.create({
    data: {
      title: 'Bienvenida al Foro: Reglas y Presentaciones',
      slug: 'bienvenida-reglas-y-presentaciones',
      content: 'Comparte quién eres, de dónde vienes y qué estudias. Sé respetuosa/o: sin SPAM.',
      authorId: sof.id,
    }
  });

  await prisma.comment.create({
    data: {
      content: '¡Hola! Soy Sofía. Este espacio es para aprender y conectar. 💬',
      authorId: sof.id,
      threadId: t1.id,
    }
  });

  console.log('Seed done.');
}

main().catch(e => (console.error(e), process.exit(1))).finally(() => prisma.$disconnect());
