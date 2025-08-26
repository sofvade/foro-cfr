// prisma/seed.js (CommonJS)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const europea = await prisma.university.upsert({
    where: { name: "Universidad Europea" },
    update: {},
    create: {
      name: "Universidad Europea",
      country: "España",
      city: "Madrid",
      website: "https://universidadeuropea.com",
      rankings: { create: [{ year: 2025, position: 120, source: "QS" }, { year: 2024, position: 115, source: "THE" }] }
    },
  });

  const complu = await prisma.university.upsert({
    where: { name: "Universidad Complutense de Madrid" },
    update: {},
    create: {
      name: "Universidad Complutense de Madrid",
      country: "España",
      city: "Madrid",
      website: "https://www.ucm.es",
      rankings: { create: [{ year: 2025, position: 200, source: "QS" }] }
    },
  });

  console.log({ europea: europea.id, complu: complu.id });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

