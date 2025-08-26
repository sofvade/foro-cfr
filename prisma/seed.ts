import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // usuario demo
  const passwordHash = await bcrypt.hash('demo1234', 10);
  const sof = await prisma.user.upsert({
    where: { email: 'sofia@example.com' },
    update: {},
    create: { email: 'sofia@example.com', name: 'Sofía', passwordHash },
  });

  // categorías
  const categories = [
    { slug: 'alojamiento', name: 'Alojamiento' },
    { slug: 'visados', name: 'Visados' },
    { slug: 'finanzas', name: 'Finanzas' },
    { slug: 'vida-universitaria', name: 'Vida universitaria' },
    { slug: 'salud-mental', name: 'Salud mental' },
    { slug: 'trabajo', name: 'Trabajo' },
  ];
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }
  const foroCat = await prisma.category.findUnique({ where: { slug: 'vida-universitaria' } });

  // hilo de bienvenida
  const t1 = await prisma.thread.upsert({
    where: { slug: 'bienvenida-reglas-y-presentaciones' },
    update: {},
    create: {
      title: 'Bienvenida al Foro: Reglas y Presentaciones',
      slug: 'bienvenida-reglas-y-presentaciones',
      content:
        'Comparte quién eres, de dónde vienes y qué estudias. Sé respetuosa/o: sin SPAM. Lee las normas en la portada del foro.',
      authorId: sof.id,
      categoryId: foroCat?.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 'seed-welcome-1' },
    update: {},
    create: {
      id: 'seed-welcome-1',
      content: '¡Hola! Soy Sofía. Este espacio es para aprender y conectar. 💬',
      authorId: sof.id,
      threadId: t1.id,
    },
  });

  console.log('Seed done.');
}

main().catch((e) => (console.error(e), process.exit(1))).finally(() => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const europea = await prisma.university.create({
    data: {
      name: "Universidad Europea",
      country: "España",
      city: "Madrid",
      website: "https://universidadeuropea.com",
      rankings: {
        create: [
          { year: 2025, position: 120, source: "QS" },
          { year: 2024, position: 115, source: "THE" },
        ],
      },
    },
  });

  const complu = await prisma.university.create({
    data: {
      name: "Universidad Complutense de Madrid",
      country: "España",
      city: "Madrid",
      website: "https://www.ucm.es",
      rankings: {
        create: [{ year: 2025, position: 200, source: "QS" }],
      },
    },
  });

  console.log({ europea, complu });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

