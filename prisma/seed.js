const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function ensureUniversity({ name, country, city, website }, rankings = []) {
  let uni = await prisma.university.findFirst({ where: { name } });
  if (!uni) {
    uni = await prisma.university.create({ data: { name, country, city, website } });
  }
  for (const r of rankings) {
    const exists = await prisma.ranking.findFirst({
      where: { year: r.year, source: r.source, universityId: uni.id },
    });
    if (!exists) await prisma.ranking.create({ data: { ...r, universityId: uni.id } });
  }
  return uni;
}

async function main() {
  await ensureUniversity(
    { name: "Universidad Europea", country: "España", city: "Madrid", website: "https://universidadeuropea.com" },
    [{ year: 2025, position: 120, source: "QS" }, { year: 2024, position: 115, source: "THE" }]
  );

  await ensureUniversity(
    { name: "Universidad Complutense de Madrid", country: "España", city: "Madrid", website: "https://www.ucm.es" },
    [{ year: 2025, position: 200, source: "QS" }]
  );
}

main().catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

